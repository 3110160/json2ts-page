const JsonToTS = require("json-to-ts");

$(function () {
  $("#loading").hide();
  const opts = {
    matchBrackets: true,
    lineWrapping: true,
    fixedGutter: true,
    autoCloseBrackets: true,
    mode: "application/ld+json",
    theme: "dracula",
    lineWrapping: true,
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
  };
  const editor0 = CodeMirror.fromTextArea(
    document.getElementById("code0"),
    opts
  );
  const editor1 = CodeMirror.fromTextArea(
    document.getElementById("code1"),
    opts
  );
  const editor2 = CodeMirror.fromTextArea(document.getElementById("code2"), {
    ...opts,
    mode: "text/typescript",
  });

  // 转换
  const transformJson = (res) => {
    let tsArr = [];
    JsonToTS(res.data).forEach((typeInterface) => {
      tsArr.push(typeInterface);
    });
    $("#loading").hide();
    editor2.setValue(tsArr.join("\n"));
  };
  // 创建请求
  const createRequest = () => {
    $("#loading").show();
    const baseURL = $("input[name='domain']").val();
    let headers = editor0
      .getValue()
      .replace(/[\r\n]/g, "")
      .replace(/'/g, '"');
    let params = editor1
      .getValue()
      .replace(/[\r\n]/g, "")
      .replace(/'/g, '"');
    const methods = $("select[name='methods']").val() || "get";
    const api = $("input[name='api']").val() || "/api";
    try {
      params = JSON.parse(params);
      headers = JSON.parse(headers);
    } catch (_) {
      $("#loading").hide();
      alert("请输入符合JSON规范的JSON串");
    }
    const instance = axios.create({
      baseURL,
      timeout: 5000,
      headers,
    });
    if (methods === "put" || methods === "post" || methods === "patch") {
      instance[methods](api, params)
        .then(transformJson)
        .catch((_) => {
          $("#loading").hide();
          alert("请求出错");
        });
    } else {
      instance[methods](api, { params })
        .then(transformJson)
        .catch((_) => {
          $("#loading").hide();
          alert("请求出错");
        });
    }
  };
  // 注册事件
  $("#submit").click(createRequest);
});
