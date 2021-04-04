import React from 'react'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: 'doughnut2d',
    renderAt: 'chart-container',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Starts Per Language',
        theme: 'fusion',
        pieRadius: '45%',
        showPercentValues: 0,
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default Doughnut2d
