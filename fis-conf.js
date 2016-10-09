fis.match('*.less', {
  // fis-parser-less 插件进行解析
  parser: fis.plugin('less-2.x'),
  // .less 文件后缀构建后被改成 .css 文件
  rExt: '.css'
});

fis.match('*.jade', {
  parser: fis.plugin('jade',{
    pretty: true
  }),

  rExt: '.html'
});

fis.match('*.html', {
  pretty: true
});






