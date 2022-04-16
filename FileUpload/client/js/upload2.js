// 单一文件上传「BASE64」，只适合图片

(function(){
  // 获取相关输入框和按钮
  let upload = document.querySelector('#upload2');
  let upload_inp = upload.querySelector('.upload_inp');
  let upload_button_select = upload.querySelector('.upload_button.select');

  // 检查元素是否处于禁用和loading状态
  const checkIsDisable = (element) => {
    let classList = element.classList;
    return classList.contains('disable') || classList.contains('loading')
  };

  // 点击选择文件按钮，触发上传文件input框选择文件的行为
  upload_button_select.addEventListener("click", function(){
    if(checkIsDisable(this)){ return }
    upload_inp.click();
  });

  // 把选择的文件转换为BASE64
  const changeBASE64 = (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader(); // javascipt内置类
      fileReader.readAsDataURL(file);
      fileReader.onload = (event) => {
        resolve(event.target.result);
      }
    });
  }

  // 监听用户选择文件的操作
  upload_inp.addEventListener("change", async function(){
    let file = this.files[0];
    if(!file){ return }
    // 限制文件上传的类型
    let fileNameReg = /(PNG|JPG|JPEG)/i;
    if(!fileNameReg.test(file.type)){ return alert("上传的文件只能是PNG/JPG/JPEG") }
    // 限制文件大小
    if(file.size > 2*1024*1024){ return alert("上传的文件大小不能超过2M") }

    // 开启loading
    upload_button_select.classList.add("loading");

    // 文件对象转换为BASE64
    let BASE64 = await changeBASE64(file);
    let data = null;
    let params = { file: encodeURIComponent(BASE64), filename: file.name  };
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    try {
      data = await instance.post("/upload_single_base64", params, { headers: headers });
      if(+data.code === 0){
        return alert(`文件已经上传成功，可以基于${data.servicePath}来访问文件`);
      }
      throw data.codeText;
    } catch (error) {
      alert("文件上传失败");
    } finally {
      // try...catch...的finally
      // 去除loading
      upload_button_select.classList.remove("loading");
    }
  });
})();
