// 大文件，切片上传

(function(){
  let upload = document.querySelector('#upload7');
  let upload_inp = upload.querySelector('.upload_inp');
  let upload_button_select = upload.querySelector('.upload_button.select');
  let upload_progress = upload.querySelector('.upload_progress');
  let upload_progress_value = upload_progress.querySelector('.value');

  // 检查元素是否处于禁用和loading状态
  const checkIsDisable = (element) => {
    let classList = element.classList;
    return classList.contains('disable') || classList.contains('loading')
  };

  // 文件对象转换为buffer和生成hash名称
  const changeBuffer = (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader(); // javascipt内置类
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (event) => {
        let buffer = event.target.result;
        let spark = new SparkMD5.ArrayBuffer();
        spark.append(buffer);
        let HASH = spark.end();
        let suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
        resolve({
          buffer,
          HASH,
          suffix,
          filename: `${HASH}.${suffix}`
        });
      }
    });
  };

  // 点击选择文件按钮，触发上传文件input框选择文件的行为
  upload_button_select.addEventListener("click", function(){
    if(checkIsDisable(this)){ return }
    upload_inp.click();
  });

  // 监听用户选择文件的操作
  upload_inp.addEventListener("change", async function(){
    let file = this.files[0];
    if(!file){ return }

    upload_button_select.classList.add("loading");
    upload_progress.style.display = "block";
    
    // 获取文件的hash
    let { HASH, suffix } = await changeBuffer(file);
    
    let already = []; // 已经上传的切片
    // 获取已经上传的切片信息
    try {
      let data = await instance.get("/upload_already", { params: { HASH } });
      if(+data.code == 0){
        already = data.fileList;
      }
    } catch (error) {}

    // 实现文件切片，固定数量或者固定大小
    let chunks = []; // 切片
    let max = 1024 * 100; // 每一个切片的大小，100Kb
    let count = Math.ceil(file.size / max); // 一共有多少片
    // 限制一下，最多只能分100片
    if(count > 100){
      count = 100;
      max = file.size / 100;
    }
    for(let i=0; i<count; i++){
      // 0 max*0 ~ max*1
      // 1 max*1 ~ max*2
      // 2 max*2 ~ max*3
      chunks.push({
        file: file.slice(i*max, (i+1)*max),
        filename: `${HASH}_${i+1}.${suffix}`
      });
    }

    // 上传成功的处理
    let index = 0;
    const complete = async () => {
      index = index + 1;
      // 管控进度条
      upload_progress_value.style.width = `${(index/count)*100}%`;

      // 当所有的切片都上传成功，合并切片
      if(index >= count){
        upload_progress_value.style.width = '100%';
        // 通知服务器，合并切片
        try {
          let data = await instance.post("/upload_merge", { HASH, count }, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
          if(+data.code === 0){
            await delay(300);
            alert("切片合并成功");
            clear();
            return;
          }
          throw data.codeText
        } catch (error) {
          alert("切片合并失败");
          clear();
        }
      }
    };

    // 上传失败的处理
    const clear = () => {
      upload_button_select.classList.remove("loading");
      upload_progress.style.display = "none";
      upload_progress_value.style.width = "0%";
    };

    // 把每一个切片都上传到服务器上
    chunks.forEach((item) => {
      // 已经上传了的切片，不需要再上传了
      if(already.length>0 && already.includes(item.filename)){
        complete(); // 已经上传了的切片，认为这个切片已经上传成功了
        return;
      }

      let fm = new FormData();
      fm.append("file", item.file);
      fm.append("filename", item.filename);
      instance.post("/upload_chunk", fm).then(data => {
        if(+data.code === 0){
          complete();
          return;
        }
        return Promise.reject(data.codeText);
      }).catch(err => {
        alert("当前切片上传失败");
        clear();
      });
    });

  });

})();
