// 多文件上传

(function(){
  // 获取相关输入框和按钮
  let upload = document.querySelector('#upload5');
  let upload_inp = upload.querySelector('.upload_inp');
  let upload_button_select = upload.querySelector('.upload_button.select');
  let upload_button_upload = upload.querySelector('.upload_button.upload');
  let upload_list = upload.querySelector('.upload_list');

  let _files = [];

  // 点击选择文件按钮，触发上传文件input框选择文件的行为
  upload_button_select.addEventListener("click", function(){
    if(this.classList.contains('disable') || this.classList.contains('loading')){
      return;
    }
    upload_inp.click();
  });

  // 获取唯一值
  const createRandom = () => {
    let ran = Math.random() * Date.now();
    return ran.toString(16).replace(".", "");
  }

  // 监听用户选择文件的操作
  upload_inp.addEventListener("change", function(){
    _files = Array.from(this.files);
    if(_files.length == 0){ return }

    _files = _files.map((item) => {
      return {
        file: item,
        filename: item.name,
        key: createRandom(),
      }
    });

    let str = "";
    _files.forEach((item, index) => {
      str = str + `<li key="${item.key}">
        <span>文件${index+1}：${item.filename}</span>
        <span><em>移除</em></span>
      </li>`;
    });
    upload_list.innerHTML = str;
    upload_list.style.display = "block";
  });

  // 移除按钮的点击处理
  upload_list.addEventListener("click", function(event){
    let target = event.target;
    let current = null;
    // 判断点击的是否是移除按钮
    if(target.tagName == "EM"){
      current = target.parentNode.parentNode;
      if(current){
        upload_list.removeChild(current);
        let key = current.getAttribute("key");
        _files = _files.filter((item) => {
          return item.key !== key;
        });
        if(_files.length === 0){
          upload_list.style.display = "none";
        }
      }
    }
  });
  
  // 处理按钮的禁用和loading效果
  function changeDisable(flag){
    if(flag){
      upload_button_select.classList.add("disable");
      upload_button_upload.classList.add("loading");
    }else{
      upload_button_select.classList.remove("disable");
      upload_button_upload.classList.remove("loading");
    }
  }

  // 上传文件到服务器
  upload_button_upload.addEventListener("click", function(){
    // 添加校验，有disable和loading类时，直接return
    if(this.classList.contains('disable') || this.classList.contains('loading')){
      return;
    }

    // 校验文件是否存在
    if(_files.length == 0){
      return alert("请先选择要上传的文件");
    }

    // 为按钮添加禁用和loading效果
    changeDisable(true);

    let upload_list_arr = Array.from(upload_list.querySelectorAll("li"));
    _files = _files.map((item) => {
      let formData = new FormData();
      formData.append("file", item.file);
      formData.append("filename", item.filename);

      let currentLi = upload_list_arr.find(element => {
        return element.getAttribute("key") == item.key
      });

      let progressSpan = currentLi ? currentLi.querySelector("span:nth-last-child(1)") : null;

      return instance.post("/upload_single", formData, {
        onUploadProgress(event){
          // 检测每一个的上传进度
          let progress = `${((event.loaded/event.total)*100).toFixed(2)}%`;
          if(progressSpan){
            progressSpan.innerHTML = progress;
          }
        }
      }).then((data) => {
        if(+data.code === 0){
          return;
        }
        return Promise.reject();
      });
    });

    Promise.all(_files).then(async () => {
      await delay(300);
      alert("所有文件都上传成功了");
    }).catch(() => {0
      alert("上传过程当中遇到问题");
    }).finally(() => {
      changeDisable(false);
      _files = [];
      upload_list.innerHTML = "";
      upload_list.style.display = "none";
    });

  });
})();
