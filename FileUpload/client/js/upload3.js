// 单一文件上传「缩略图处理」

(function(){
  // 获取相关输入框和按钮
  let upload = document.querySelector('#upload3');
  let upload_inp = upload.querySelector('.upload_inp');
  let upload_button_select = upload.querySelector('.upload_button.select');
  let upload_button_upload = upload.querySelector('.upload_button.upload');
  let upload_abbre = upload.querySelector('.upload_abbre');
  let upload_abbre_img = upload_abbre.querySelector('img');

  let _file = null;

  // 检查元素是否处于禁用和loading状态
  const checkIsDisable = (element) => {
    let classList = element.classList;
    return classList.contains('disable') || classList.contains('loading')
  };

  // 把选择的文件转换为BASE64
  const changeBASE64 = (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader(); // javascipt内置类
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        resolve(event.target.result);
      }
    });
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
        let hash = spark.end();
        let suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
        resolve({
          buffer,
          hash,
          suffix,
          filename: `${hash}.${suffix}`
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
    // 限制文件上传的类型
    let fileNameReg = /(PNG|JPG|JPEG)/i;
    if(!fileNameReg.test(file.type)){ return alert("上传的文件只能是PNG/JPG/JPEG") }
    // 限制文件大小
    if(file.size > 2*1024*1024){ return alert("上传的文件大小不能超过2M") }

    // 开启禁用
    upload_button_select.classList.add("disable");

    let BASE64 = await changeBASE64(file);
    // 文件预览就是把文件对象转换为BASE64，赋值给img的src属性即可
    upload_abbre.style.display = "block";
    upload_abbre_img.setAttribute("src", BASE64);

    // 关闭禁用，读取文件完成之后，再移除掉disable类，这样可以避免多次点击按钮
    upload_button_select.classList.remove("disable");
    
    _file = file;
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
  upload_button_upload.addEventListener("click", async function(){
    // 添加校验，有disable和loading类时，直接return
    if(checkIsDisable(this)){ return }

    // 校验文件是否存在
    if(!_file){
      return alert("请先选择要上传的文件");
    }

    // 为按钮添加禁用和loading效果
    changeDisable(true);

    // 生成文件的HASH名字
    let { filename } = await changeBuffer(_file);  

    // 把文件传递给服务器
    let formData = new FormData();
    formData.append("file", _file);
    formData.append("filename", filename);
    instance.post("/upload_single_name", formData).then((data) => {
      if(+data.code === 0){
        return alert(`文件已经上传成功，可以基于${data.servicePath}来访问文件`);
      }
      return Promise.reject(data.codeText);
    }).catch((err) => {
      alert("文件上传失败，请您稍后再试");
    }).finally(() => {
      upload_abbre.style.display = "none";
      upload_abbre_img.setAttribute("src", "");
      _file = null;
      changeDisable(false); // 解除按钮禁用和loading
    });
  });

})();