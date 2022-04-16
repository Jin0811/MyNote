// 单一文件上传「BASE64」，只适合图片

(function(){
  // 获取相关输入框和按钮
  let upload = document.querySelector('#upload4');
  let upload_inp = upload.querySelector('.upload_inp');
  let upload_button_select = upload.querySelector('.upload_button.select');
  let upload_progress = upload.querySelector('.upload_progress');
  let upload_progress_value = upload_progress.querySelector('.value');

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

  // 监听用户选择文件的操作
  upload_inp.addEventListener("change", async function(){
    let file = this.files[0];
    if(!file){ return }
    // 限制文件上传的类型
    let fileNameReg = /(PNG|JPG|JPEG)/i;
    if(!fileNameReg.test(file.type)){ return alert("上传的文件只能是PNG/JPG/JPEG") }
    // 限制文件大小
    // if(file.size > 2*1024*1024){ return alert("上传的文件大小不能超过2M") }

    // 上传文件到服务器
    upload_button_select.classList.add("loading");
    let formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    let data = null;
    try {
      data = await instance.post("/upload_single", formData, {
        // 文件上传中的回调函数，内部使用的是 xhr.upload.onprogress
        onUploadProgress(event){
          let { loaded, total } = event;
          upload_progress.style.display = "block";
          upload_progress_value.style.width = `${(loaded / total)*100}%`;
        }
      });
      if(+data.code === 0){
        upload_progress_value.style.width = `100%`;
        await delay(300);
        return alert(`文件已经上传成功，可以基于${data.servicePath}来访问文件`);
      }
      throw data.codeText;
    } catch (error) {
      alert("文件上传失败");
    } finally {
      upload_button_select.classList.remove("loading");
      upload_progress.style.display = "none";
      upload_progress_value.style.width = `0%`;
    }
  });

})();
