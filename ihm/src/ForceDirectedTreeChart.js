import React, { useLayoutEffect, useState, useEffect, useMemo, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import './ForceDirectedTreeChart.css'; // Import the CSS file

// Importações dos ícones
import { FaListAlt, FaStar, FaFilter, FaRedo, FaPlus, FaMinus, FaCrosshairs, FaInfoCircle } from 'react-icons/fa';

// Importar o hook personalizado
import useFiltragem from './useFiltragem';

// Componente ZoomButtons já separado
import ZoomButtons from './ZoomButtons';

const ForceDirectedTreeChart = () => {
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [relevanciaFiltro, setRelevanciaFiltro] = useState(50);
  const [classificacaoFiltro, setClassificacaoFiltro] = useState('');
  const { dadosFiltrados, carregando } = useFiltragem(categoriaFiltro, relevanciaFiltro, classificacaoFiltro);
  const [configuracoes, setConfiguracoes] = useState({
    manyBodyStrength: -20,
    centerStrength: 0.05,
    minRadius: 25,
    maxRadius: 50,
    linkStrokeWidth: 1
  });
  const rootRef = useRef(null);

  const categoriasDisponiveis = useMemo(() => {
    const categorias = new Set();
    const extrairCategorias = (itens) => {
      itens.forEach(item => {
        if (item.category !== undefined && item.category !== null) {
          categorias.add(item.category);
        }
        if (item.children) {
          extrairCategorias(item.children);
        }
      });
    };
    extrairCategorias(dadosFiltrados);
    return Array.from(categorias).sort((a, b) => a - b); 
  }, [dadosFiltrados]);

  const contarNos = (dados) => {
    let count = 0;
    const contarRecursivo = (itens) => {
      itens.forEach(item => {
        count++;
        if (item.children) {
          contarRecursivo(item.children);
        }
      });
    };
    contarRecursivo(dados);
    return count;
  };

  const totalNos = contarNos(dadosFiltrados);

  useEffect(() => {
    // Ajustes baseados na quantidade de nós
    if (totalNos > 100) {
      setConfiguracoes({
        manyBodyStrength: -30,
        centerStrength: 0.07,
        minRadius: 20,
        maxRadius: 40,
        linkStrokeWidth: 0.8
      });
    } else if (totalNos > 50) {
      setConfiguracoes({
        manyBodyStrength: -25,
        centerStrength: 0.06,
        minRadius: 22,
        maxRadius: 45,
        linkStrokeWidth: 0.9
      });
    } else {
      setConfiguracoes({
        manyBodyStrength: -20,
        centerStrength: 0.05,
        minRadius: 25,
        maxRadius: 50,
        linkStrokeWidth: 1
      });
    }
  }, [totalNos]);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    rootRef.current = root;
    root.setThemes([am5themes_Animated.new(root)]);
    root.container.set("mask", null);

    const backgroundColor = am5.color("#1a1a1a");
    const nodeColor = am5.color("#999999");
    const linkColor = am5.color("#444444");
    const hoverColor = am5.color("#cccccc");
    const textColor = am5.color("#ffffff");

    root.interfaceColors.set("background", backgroundColor);
    root.interfaceColors.set("text", textColor);

    let series = root.container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        idField: "id",
        valueField: "category",
        categoryField: "label",
        childDataField: "children",
        linkWithField: "linkWith",
        manyBodyStrength: configuracoes.manyBodyStrength,
        centerStrength: configuracoes.centerStrength,
        minRadius: configuracoes.minRadius,
        maxRadius: configuracoes.maxRadius,
      })
    );

    series.set("panX", true);
    series.set("panY", true);
    series.set("wheelX", "zoomX");
    series.set("wheelY", "zoomY");
    series.set("doubleClickEnabled", true);

    series.set("interactive", true);
    series.set("animationDuration", 500);
    series.set("animationEasing", am5.ease.cubicInOut);

    series.nodes.template.setAll({
      fillOpacity: 0.9,
      strokeWidth: 0,
      fill: nodeColor,
      cursorOverStyle: "pointer",
      forceCreate: true,
      tooltipText: "{label}",
      circle: am5.Circle.new(root, {
        radius: configuracoes.maxRadius - 20, // Ajuste dinâmico do raio
        fill: nodeColor,
      }),
      labelText: ""
    });

    series.nodes.template.states.create("hover", {
      scale: 1.2,
      fill: hoverColor
    });

    series.links.template.setAll({
      strokeOpacity: 0.6,
      stroke: linkColor,
      strokeWidth: configuracoes.linkStrokeWidth,
      tensionX: 0.5,
      tensionY: 0.5,
      geometryCached: true,
      forceCreate: true
    });

    series.nodes.template.events.on("pointerover", (event) => {
      let data = event.target.dataItem.dataContext;
      let tooltipText = data.description 
        ? `[fontSize:14px][bold]${data.label}[/]\n${data.description}[/]`
        : `[fontSize:14px][bold]${data.label}[/]`;

      let tooltip = am5.Tooltip.new(root, {
        getFillFromSprite: false,
        labelText: tooltipText,
        fill: am5.color("#2b2b2b"),
        stroke: am5.color("#888888"),
        strokeWidth: 1,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        cornerRadius: 4,
        labelFill: textColor
      });
      event.target.set("tooltip", tooltip);
    });

    series.nodes.template.events.on("click", (event) => {
      let node = event.target;

      series.nodes.each((otherNode) => {
        otherNode.setAll({
          fillOpacity: otherNode === node ? 1 : 0.3,
        });
      });

      series.links.each((link) => {
        link.setAll({
          strokeOpacity: 0.1
        });
        if (link.get("source") === node || link.get("target") === node) {
          link.setAll({
            strokeOpacity: 0.8
          });
        }
      });
    });

    series.data.setAll(dadosFiltrados);

    series.appear(1000, 100);

    root.fontFamily = "Inter, system-ui, -apple-system, sans-serif";
    root.fontSize = "14px";

    return () => {
      root.dispose();
    };
  }, [dadosFiltrados, configuracoes]);

  // Funções de Zoom Atualizadas
  const zoomIn = () => {
    if (rootRef.current) {
      const root = rootRef.current;
      const container = root.container;
      const currentScale = container.get("scale") || 1;
      const newScale = Math.min(currentScale * 1.2, 5); // Limite máximo de 5x
      container.animate({
        key: "scale",
        to: newScale,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic)
      });
    }
  };

  const zoomOut = () => {
    if (rootRef.current) {
      const root = rootRef.current;
      const container = root.container;
      const currentScale = container.get("scale") || 1;
      const newScale = Math.max(currentScale / 1.2, 0.5); // Limite mínimo de 0.5x
      container.animate({
        key: "scale",
        to: newScale,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic)
      });
    }
  };

    // Atualizar a função resetarZoom para centralizar o grafo corretamente
  const resetarZoom = () => {
    if (rootRef.current) {
      const root = rootRef.current;
      const container = root.container;
  
      // Resetar escala
      container.animate({
        key: "scale",
        to: 1,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic)
      });
  
      // Resetar posição
      container.animate({
        key: "x",
        to: 0,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic)
      });
      container.animate({
        key: "y",
        to: 0,
        duration: 500,
        easing: am5.ease.out(am5.ease.cubic)
      });
    }
  };

  const limparFiltros = () => {
    setCategoriaFiltro('');
    setRelevanciaFiltro(50);
    setClassificacaoFiltro('');
  };

  return (
    <div className="chart-container">
      <h1 className="title">Grafo de Competências</h1>
      <p className="description">
        Use os filtros para refinar as competências exibidas. Clique em um nó para destacar conexões relacionadas.
      </p>
      <fieldset className="filters-fieldset">
        <legend className="filters-legend">Filtros</legend>
        <div className="filters-container">
          <div className="filter">
            <label htmlFor="categoria" className="filter-label">
              <FaListAlt className="filter-icon" />
              Categoria:
            </label>
            <select 
              id="categoria"
              value={categoriaFiltro} 
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="filter-select"
              aria-label="Selecionar categoria para filtrar competências"
            >
              <option value="">Todas</option>
              {categoriasDisponiveis.map(cat => (
                <option key={cat} value={cat}>{`Categoria ${cat}`}</option>
              ))}
            </select>
          </div>
          
          <div className="filter">
            <label htmlFor="classificacao" className="filter-label">
              <FaFilter className="filter-icon" />
              Classificação:
              <FaInfoCircle 
                className="info-icon" 
                aria-label="Avaliar: Descrição Avaliar; Aplicar: Descrição Aplicar; Criar: Descrição Criar"
                title="Avaliar: Descrição Avaliar; Aplicar: Descrição Aplicar; Criar: Descrição Criar"
                style={{ marginLeft: '5px', cursor: 'pointer' }}
              />
            </label>
            <select 
              id="classificacao"
              value={classificacaoFiltro} 
              onChange={(e) => setClassificacaoFiltro(e.target.value)}
              className="filter-select"
              aria-label="Selecionar classificação para filtrar competências"
            >
              <option value="">Todas</option>
              <option value="Avaliar">Avaliar</option>
              <option value="Aplicar">Aplicar</option>
              <option value="Criar">Criar</option>
            </select>
          </div>
        </div>

        <button 
          onClick={limparFiltros}
          className="limpar-filtros-button"
          aria-label="Limpar todos os filtros aplicados"
        >
          <FaRedo className="button-icon"/>
          Limpar filtros
        </button>

        {carregando && (
          <div className="carregando">
            <span className="loader"></span> Aplicando filtros...
          </div>
        )}

        {totalNos > 0 ? (
          <div className="resultado">
            Exibindo <strong>{totalNos}</strong> nó(s) após aplicar os filtros.
          </div>
        ) : (
          <div className="resultado">
            Nenhum resultado encontrado com os filtros atuais.
          </div>
        )}
      </fieldset>

      <p className="instrucoes">
        Use a roda do mouse para dar zoom e clique e arraste para mover o grafo.
      </p>

      <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} resetarZoom={resetarZoom} />

      <div 
        id="chartdiv" 
        className="chart-div"
      />
    </div>
  );
};

export default ForceDirectedTreeChart;