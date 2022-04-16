// 单一文件上传「FORM-DATA」

(function(){
  // 获取相关输入框和按钮
  let upload = document.querySelector('#upload1');
  let upload_inp = upload.querySelector('.upload_inp');
  let upload_button_select = upload.querySelector('.upload_button.select');
  let upload_button_upload = upload.querySelector('.upload_button.upload');
  let upload_tip = upload.querySelector('.upload_tip');
  let upload_list = upload.querySelector('.upload_list');

  let _file = null;

  // 点击选择文件按钮，触发上传文件input框选择文件的行为
  upload_button_select.addEventListener("click", function(){
    // 添加校验，有disable和loading类时，直接return
    if(this.classList.contains('disable') || this.classList.contains('loading')){
      return;
    }
    upload_inp.click();
  });

  // 监听用户选择文件的操作
  upload_inp.addEventListener("change", function(){
    // 获取用户选择的文件
    // name:文件名称
    // size：文件大小
    // type：文件的MIME类型
    let file = this.files[0]; // 这里的this指向的就是upload_inp
    if(!file){ return }

    // 限制文件上传的类型
    // 限制文件上传最好是通过input的accept属性和代码双重限制
    // <input type="file" class="upload_inp" accept=".png,.jpg,.jpeg">
    // accept属性用户可能会选择所有文件，一样可以选择不符合格式的文件
    let fileNameReg = /(PNG|JPG|JPEG)/i;
    if(!fileNameReg.test(file.type)){
      return alert("上传的文件只能是PNG/JPG/JPEG");
    }

    // 限制文件大小
    if(file.size > 2*1024*1024){
      return alert("上传的文件大小不能超过2M");
    }

    // 文件类型和大小校验通过，去除tips提示，显示选中的文件
    upload_tip.style.display = "none";
    upload_list.style.display = "block";
    upload_list.innerHTML = `<li>
      <span>文件：${file.name}</span>
      <span><em>移除</em></span>
    </li>`;

    _file = file; // 存储file，方便其他函数使用
  });

  // 上传成功和失败，以及点击移除按钮，都要清空文件
  function clearHandle(){
    upload_tip.style.display = "block";
    upload_list.style.display = "none";
    upload_list.innerHTML = "";
    _file = null; // 移除文件，重置 _file 变量
  }

  // 移除按钮的点击处理
  // 这里因为移除按钮是动态添加的，所以这里使用了事件委托
  // 点击移除按钮，点击事件会一层一层往上传递，这里直接监听移除按钮的祖先元素的事件
  // 再判断事件的target是否是移除按钮，来实现文件的移除操作
  upload_list.addEventListener("click", function(event){
    let target = event.target;
    // 判断点击的是否是移除按钮
    if(target.tagName == "EM"){
      clearHandle();
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
    if(!_file){
      return alert("请先选择要上传的文件");
    }

    // 为按钮添加禁用和loading效果
    changeDisable(true);

    // 把文件传递给服务器：FormData 和 BASE64
    // BASE64只适合图片
    let formData = new FormData();
    formData.append("file", _file);
    formData.append("filename", _file.name);
    instance.post("/upload_single", formData).then((data) => {
      if(+data.code === 0){
        return alert(`文件已经上传成功，可以基于${data.servicePath}来访问文件`);
      }
      return Promise.reject(data.codeText);
    }).catch((err) => {
      alert("文件上传失败，请您稍后再试");
    }).finally(() => {
      // 无论成功和失败，都会执行这个回调，所以可以把clearHandle和changeDisable放到这里
      // 这样就不用在then和catch当中写两遍了
      clearHandle(); // 清空文件
      changeDisable(false); // 解除按钮禁用和loading
    });
  });

})();
