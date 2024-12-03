import React, { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import competencias from './competencias.json';

const ForceDirectedTreeChart = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    // Configurar tema escuro
    root.interfaceColors.set("background", am5.color("#1a1a1a"));
    root.interfaceColors.set("text", am5.color("#ffffff"));

    let series = root.container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        idField: "id",
        valueField: "value",
        categoryField: "label",
        childDataField: "children",
        manyBodyStrength: -100,
        centerStrength: 0.5,
        minRadius: 10,
        maxRadius: 25,
        linkWithField: "linkWith",
        singleBranchOnly: false,
      })
    );

    // Estilizar nós
    series.nodes.template.setAll({
      labelText: "{label}",
      fillOpacity: 0.8,
      visible: true,
      strokeWidth: 2,
      strokeOpacity: 1,
      fill: am5.color("#7f7fff"), // Azul claro para preenchimento
      stroke: am5.color("#ffffff"), // Contorno branco
      cursorOverStyle: "pointer",
      forceCreate: true,
      circle: am5.Circle.new(root, {
        radius: 20, // Define o raio do círculo
        stroke: am5.color("#ffffff"), // Contorno
        strokeWidth: 2, // Largura do contorno
        strokeOpacity: 1, // Opacidade máxima do contorno
        fill: am5.color("#7f7fff"), // Azul claro no preenchimento
        fillOpacity: 0.9 // Opacidade do preenchimento
      }),
      hitArea: am5.Circle.new(root, {
        radius: 20 // Área de clique
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
    // Configurar tooltip personalizado
    series.nodes.template.events.on("pointerover", function(event) {
      let data = event.target.dataItem.dataContext;
      let tooltipText = data.description 
        ? `[fontSize: 14px bold]${data.label}[/]\n[fontSize: 12px]${data.description}[/]`
        : `[fontSize: 14px bold]${data.label}[/]`;
        
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

    // Evento de clique
    series.nodes.template.events.on("click", function(event) {
      let data = event.target.dataItem.dataContext;
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

      let linkedNodes = [];
      series.links.each(function(link) {
        if (link.get("source") === node || link.get("target") === node) {
          link.setAll({
            strokeOpacity: 1
          });
          linkedNodes.push(link.get("source"));
          linkedNodes.push(link.get("target"));
        }
      });
    });

    // Dados
    series.data.setAll(competencias);

    // Animação inicial
    series.appear(1000, 100);

    // Melhorar a qualidade do texto
    root.fontFamily = "Inter, system-ui, -apple-system, sans-serif";
    root.fontSize = "12px";

    series.labels.template.setAll({
      text: "{id}",
      fontSize: "12px",
      fontWeight: "500",
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
      text: "{id}",
      textRendering: "optimizeLegibility",
      fontSmoothing: "antialiased",
      cursorOverStyle: "pointer",
      pixelPerfect: false
    });

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div 
      id="chartdiv" 
      style={{ 
        width: "100%", 
        height: "100vh",
        background: "#1a1a1a"
      }}
    />
  );
};

export default ForceDirectedTreeChart;