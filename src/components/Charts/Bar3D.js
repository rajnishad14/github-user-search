import React from 'react'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

const Bar3D = ({ data }) => {
  const chartConfigs = {
    type: 'bar3D',
    renderAt: 'chart-container',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Forked',
        theme: 'fusion',
        yAxisName: 'Forkes',
        xAxisName: 'Repos',
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default Bar3D
