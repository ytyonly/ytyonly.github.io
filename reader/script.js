document.addEventListener('DOMContentLoaded', () => {
    const fileSelector = document.getElementById('file-selector');
    const contentDiv = document.getElementById('content');
  
    // 获取文本文件列表
    const textFiles = [
      'correction.txt',
    ];
  
    // 动态添加文件选项
    textFiles.forEach((file) => {
      const option = document.createElement('option');
      option.value = file;
      option.textContent = file;
      fileSelector.appendChild(option);
    });
  
    // 加载默认文件
    loadFile(textFiles[0]);
  
    // 监听文件选择器的变化
    fileSelector.addEventListener('change', (e) => {
      loadFile(e.target.value);
    });
  
    // 加载并显示文件内容
    function loadFile(fileName) {
      fetch(`texts/${fileName}`)
        .then((response) => response.text())
        .then((text) => {
          const formattedText = formatText(text);
          contentDiv.textContent = formattedText;
        })
        .catch((error) => {
          contentDiv.textContent = '无法加载文件。';
          console.error(error);
        });
    }
  
    // 格式化文本，每三行换行，句子未结束则继续
    function formatText(text) {
      const sentences = text.match(/[^。！？]+[。！？]?/g);
      if (!sentences) return text;
  
      let formattedText = '';
      let lineCount = 0;
  
      sentences.forEach((sentence, index) => {
        formattedText += sentence;
  
        // 检查下一个句子是否存在，以及当前行的句子数
        if ((lineCount + 1) % 3 === 0 && index !== sentences.length - 1) {
          formattedText += '\n';
        }
  
        lineCount++;
      });
  
      return formattedText;
    }
  });
  