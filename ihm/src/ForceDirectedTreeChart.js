import React, { useLayoutEffect, useState, useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import competencias from './competencias.json';

const ForceDirectedTreeChart = () => {
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [relevanciaFiltro, setRelevanciaFiltro] = useState('');
  const [classificacaoFiltro, setClassificacaoFiltro] = useState('');
  const [dadosFiltrados, setDadosFiltrados] = useState(competencias);

  useEffect(() => {
    const aplicarFiltros = () => {
      let filtrados = competencias;

      if (categoriaFiltro) {
        filtrados = filtrados.filter(item => item.category === categoriaFiltro);
      }

      if (relevanciaFiltro) {
        filtrados = filtrados.filter(item => item.relevancia >= relevanciaFiltro);
      }

      if(classificacaoFiltro){
        filtrados = filtrados.filter(item => item.classificação == classificacaoFiltro);
      }

      setDadosFiltrados(filtrados);
    };

    aplicarFiltros();
  }, [categoriaFiltro, relevanciaFiltro, classificacaoFiltro]);

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    // Configurar tema escuro
    root.interfaceColors.set("background", am5.color("#1a1a1a"));
    root.interfaceColors.set("text", am5.color("#ffffff"));

    let series = root.container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        idField: "id",
        valueField: "category",
        categoryField: "label",
        childDataField: "children",
        manyBodyStrength: -150,
        centerStrength: 0.5,
        minRadius: 50,
        maxRadius: 100,
        linkWithField: "linkWith",
        singleBranchOnly: false,
      })
    );

    // Adicionar Zoom e Pan
    series.set("panX", true);
    series.set("panY", true);
    series.set("wheelX", "zoomX");
    series.set("wheelY", "zoomY");
    series.set("doubleClickEnabled", true);

    // Configurar animações suaves
    series.set("setInteractive", true);
    series.set("animationDuration", 500); // Duração da animação em ms
    series.set("animationEasing", am5.ease.cubicInOut);

    // Estilizar nós
    series.nodes.template.setAll({
      labelText: "{label}",
      fillOpacity: 0.8,
      visible: true,
      strokeWidth: 2,
      strokeOpacity: 1,
      fill: am5.color("#7f7fff"),
      stroke: am5.color("#ffffff"),
      cursorOverStyle: "pointer",
      forceCreate: true,
      circle: am5.Circle.new(root, {
        radius: 20,
        stroke: am5.color("#ffffff"),
        strokeWidth: 2,
        strokeOpacity: 1,
        fill: am5.color("#7f7fff"),
        fillOpacity: 0.9
      }),
      hitArea: am5.Circle.new(root, {
        radius: 20
      })
    });

    // Estilizar links
    series.links.template.setAll({
      strokeOpacity: 0.5,
      stroke: am5.color("#7f7fff"),
      strokeWidth: 2,
      tensionX: 0.5,
      tensionY: 0.5,
      geometryCached: true,
      forceCreate: true
    });

    // Interatividade ao passar o mouse
    series.nodes.template.states.create("hover", {
      scale: 1.1,
      fillOpacity: 1,
      strokeWidth: 3
    });

    // Tooltips personalizadas
    series.nodes.template.events.on("pointerover", function(event) {
      let data = event.target.dataItem.dataContext;
      let tooltipText = data.description 
        ? `[fontSize: 16px bold]${data.label}[/]\n[fontSize: 14px]${data.description}[/]`
        : `[fontSize: 16px bold]${data.label}[/]`;
        
      let tooltip = am5.Tooltip.new(root, {
        getFillFromSprite: false,
        labelText: tooltipText,
        fill: am5.color("#262626"),
        stroke: am5.color("#7f7fff"),
        strokeWidth: 2,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        cornerRadius: 5
      });
      
      event.target.set("tooltip", tooltip);
    });

    // Evento de clique com filtros aprimorados
    series.nodes.template.events.on("click", function(event) {
      let data = event.target.dataItem.dataContext;
      if (data.url) {
        window.open(data.url, '_blank');
      }
      
      let node = event.target;
      
      // Destacar nó selecionado
      series.nodes.template.setAll({
        fillOpacity: 0.3,
        strokeOpacity: 0.2
      });
      
      node.setAll({
        fillOpacity: 1,
        strokeOpacity: 1
      });

      // Destacar conexões
      series.links.template.setAll({
        strokeOpacity: 0.1
      });

      series.links.each(function(link) {
        if (link.get("source") === node || link.get("target") === node) {
          link.setAll({
            strokeOpacity: 1
          });
        }
      });
    });

    // Atualizar dados com filtros aplicados
    series.data.setAll(dadosFiltrados);

    // Animação inicial
    series.appear(1000, 100);

    // Melhorar a qualidade do texto
    root.fontFamily = "Inter, system-ui, -apple-system, sans-serif";
    root.fontSize = "14px"; // Aumentar o tamanho da fonte

    series.labels.template.setAll({
      text: "{label}", // Alterado de "{id}" para "{label}"
      fontSize: "14px", // Aumentar o tamanho da fonte
      fontWeight: "600",
      fill: am5.color("#ffffff"),
      textAlign: "center",
      oversizedBehavior: "wrap",
      maxWidth: 150,
      layer: 1,
      forceHidden: false,
      templateField: "labelSettings",
      renderingMode: "continuous",
    });
    
    series.nodes.template.setAll({
      tooltipText: "{label}: {description}",
      text: "{label}", // Alterado de "{id}" para "{label}"
      textRendering: "optimizeLegibility",
      fontSmoothing: "antialiased",
      cursorOverStyle: "pointer",
      pixelPerfect: false,
      fontSize: "14px", // Aumentar o tamanho da fonte
      fill: am5.color("#ffffff")
    });

    // Adicionar Legenda
    let legend = root.container.children.push(am5.Legend.new(root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: root.verticalLayout,
      align: "right",
      paddingRight: 20,
      paddingTop: 20,
      paddingBottom: 20
    }));

    // Configurar items da legenda
    legend.data.setAll(series.dataItems.map(dataItem => {
      return {
        name: dataItem.dataContext.name || dataItem.dataContext.label,
        fill: dataItem.get("fill")
      };
    }));

    return () => {
      root.dispose();
    };
  }, [dadosFiltrados]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#1a1a1a' 
    }}>
      <div style={{ marginBottom: '20px', color: '#ffffff' }}>
        <label>
          Categoria:
          <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
            <option value="">Todas</option>
            <option value="Categoria1">Categoria 1</option>
            <option value="Categoria2">Categoria 2</option>
            {/* ... */}
          </select>
        </label>

        <label style={{ marginLeft: '20px' }}>
          Relevância mínima:
          <input
            type="number"
            value={relevanciaFiltro}
            onChange={(e) => setRelevanciaFiltro(e.target.value)}
            min="0"
            max="100"
            style={{ width: '60px', marginLeft: '5px' }}
          />
        </label>

        <label style={{ marginLeft: '20px' }}> {/* Novo filtro */}
          Classificação:
          <select value={classificacaoFiltro} onChange={(e) => setClassificacaoFiltro(e.target.value)}>
            <option value="">Todas</option>
            <option value="Avaliar">Avaliar</option>
            <option value="Aplicar">Aplicar</option>
            <option value="Criar">Criar</option>
            {/* Adicione outras classificações conforme necessário */}
          </select>
        </label>
      </div>

      <div 
        id="chartdiv" 
        style={{ 
          width: "100%", 
          height: "80vh",
          background: "#1a1a1a",
          overflow: "auto"      
        }}
      />
    </div>
  );
};


export default ForceDirectedTreeChart;