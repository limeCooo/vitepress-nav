<template>
  <div class="hot-table-container">
    <div>
      <button @click="generateTableData">Generate Table Data</button>
      <button @click="exportTableHtml">Export Table HTML</button>
    </div>

    <hot-table ref="hotTableRef" :settings="hotSettings" :data="hotData" :language="language"
               class="hot-table"></hot-table>
    <div ref="tableRef" class="table-wrap"></div>

    <code>{{ tableHtmlValue }}</code>

  </div>
</template>

<script setup>
import {ref} from 'vue'
import {HotTable} from '@handsontable/vue3';
import {registerAllModules} from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
import {registerLanguageDictionary, zhCN,} from 'handsontable/i18n';
// register Handsontable's modules
registerAllModules();
registerLanguageDictionary(zhCN);

const tableHtmlValue = ref('')

const language = 'zh-CN'
const hotData = ref([]);
const hotTableRef = ref(null);
const tableRef = ref(null);
const hotSettings = {
  licenseKey: 'non-commercial-and-evaluation',
  width: 'auto',
  height: 'auto',
  mergeCells: true,
  rowHeights: 36,
  colWidths: 120,
  contextMenu: { //右键菜单
    callback(key, selection, clickEvent) {
      console.log(key, selection);
    },
    items: [
      'row_above', //上方插入行
      'row_below', //下方插入行
      'remove_row', //移除该行
      'col_left',
      'col_right',
      'clear_column', //清空该列
      'cut', // 剪切
      'copy', //复制
      'mergeCells'//合并
    ]
  },
  // rowHeaders: true, //是否显示行表头
  colHeaders: true, //是否显示行表头

  manualColumnResize: true, //列可拖拽 调大小
  manualRowResize: true, //行可拖拽 调大小
  autoColumnSize: true, //当值为true且列宽未设置时，自适应列大小
};
hotData.value = [
  ['John', 'Smith', '123 Main St.'],
  ['Jane', 'Doe', '456 Maple Ave.'],
  ['Bob', 'Johnson', '789 Broadway'],
]
const generateTableData = () => {
  // console.log(hotTableRef.value.hotInstance.getSourceData())
  const tableData = [];
  for (let i = 1; i <= 6; i++) {
    const row = [];
    for (let j = 1; j <= 5; j++) {
      row.push(`${i}-${j}`);
    }
    tableData.push(row);
  }
  // hotData.value = tableData;
  hotTableRef.value.hotInstance.loadData(tableData)
  // hotData.value.push(['', '', ''])
}

const printTableHtml = () => {
  console.log(hotTableRef.value.hotInstance.toHTML())
  let tableHtml = hotTableRef.value.hotInstance.toHTML()
  let tableStyle = '<table  border="1" cellpadding="0" cellspacing="0" width="100%  " style="display: table">'
  let newTableHtml = tableHtml.replace(/<table[^>]*>/, tableStyle);
  tableRef.value.innerHTML = newTableHtml
  tableHtmlValue.value = newTableHtml
};

const exportTableHtml = () => {

  // 获取 Handsontable 实例
  const hotInstance = hotTableRef.value.hotInstance;

  // 获取 Handsontable 表格的元素
  const tableElement = hotInstance.table;

  // 复制表格元素，并移除 Handsontable 的样式类
  const clonedTable = tableElement.cloneNode(true);
  clonedTable.className = '';

  // 创建一个新的 div 元素，将克隆后的表格插入其中
  const divElement = document.createElement('div');
  divElement.appendChild(clonedTable);

  // 将 div 元素插入到页面中
  document.body.appendChild(divElement);

  // 将页面中的 div 元素转换为字符串并输出到控制台
  console.log(divElement.outerHTML);
  let tableHtml = divElement.outerHTML;
  let tableStyle = '<table  border="1" cellpadding="0" cellspacing="0" width="100%">'
  let newTableHtml = tableHtml.replace(/<table[^>]*>/, tableStyle);
  // 将页面中的 div 元素移除
  document.body.removeChild(divElement);
  tableRef.value.innerHTML = newTableHtml

};

</script>


<style lang="scss" scoped>
.hot-table-container {
  width: 750px;
  height: 400px;

  .hot-table {
    width: 750px;

    :deep(.htCore) {
      display: table;
    }
  }

  .table-wrap {
    width: 750px;
    table {
      display: table;
    }
  }

  button {
    margin: 10px;
    background: #f1f1f1;
    padding: 5px 10px;
    border-radius: 5px;
    transition: opacity .3s;

    :hover {
      opacity: 0.2;
    }
  }
}

</style>
