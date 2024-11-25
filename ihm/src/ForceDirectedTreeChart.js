import React, { useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import competencias from './competencias.json';

const ForceDirectedTreeChart = () => {
  useLayoutEffect(() => {
    // Criar o root do amCharts
    let root = am5.Root.new("chartdiv");

    // Aplicar tema animado
    root.setThemes([am5themes_Animated.new(root)]);

    // Criar a série de Força Dirigida
    let series = root.container.children.push(
      am5hierarchy.ForceDirected.new(root, {
        idField: "id",
        valueField: "value",
        categoryField: "label",
        childDataField: "children",
        tooltipText: "{label}"
      })
    );

    // Definir os dados da série
    series.data.setAll(competencias);

    // Configurar os tooltips
    series.nodes.template.setAll({
      tooltipText: "{id}: {label}",
      interactive: true,
      radius: 20,
    });

    // Adicionar evento para exibir tooltip com descrição
    series.nodes.template.events.on("pointerover", function(event) {
      let data = event.target.dataItem.dataContext;
      if (data.description) {
        let tooltip = am5.Tooltip.new(root, {
          labelText: `${data.id}\n${data.label}`
        });
        event.target.set("tooltip", tooltip);
      }
    });

    // Responsividade
    series.set("width", am5.percent(100));
    series.set("height", am5.percent(100));

    // Limpeza ao desmontar o componente
    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default ForceDirectedTreeChart;