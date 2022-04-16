// 拖拽上传

(function(){
  let upload = document.querySelector('#upload6');
  let upload_inp = upload.querySelector('.upload_inp');
  let upload_submit = upload.querySelector('.upload_submit');
  let upload_mark = upload.querySelector('.upload_mark');

  let isRun = false; // 是否正在上传

  upload_submit.addEventListener("click", function(){
    upload_inp.click();
  });

  // 手动选择的方式来获取文件
  upload_inp.addEventListener("change", async function(){
    let file = this.files[0];
    if(!file){ return }
    uploadFile(file);
  });

  // 拖拽获取文件 ondragenter、ondragleave、ondragover、ondrop
  upload.addEventListener("dragover", function(event){
    event.preventDefault();
  });
  upload.addEventListener("drop", function(event){
    event.preventDefault();
    let file = event.dataTransfer.files[0];
    if(!file){ return }
    uploadFile(file);
  });

  // 文件上传
  const uploadFile = async (file) => {
    if(isRun){ return }
    isRun = true;
    upload_mark.style.display = "block";
    
    let formData = new FormData();
    formData.append("file", file);
    formData.append("filename", file.name);
    let data = null;
    try {
      data = await instance.post("/upload_single", formData);
      if(+data.code === 0){
        return alert(`文件已经上传成功，可以基于${data.servicePath}来访问文件`);
      }
      throw data.codeText;
    } catch (error) {
      alert("文件上传失败");
    } finally {
      upload_mark.style.display = "none";
      isRun = false;
    }
  };

})();
