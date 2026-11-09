(function () {
  function toast(msg) {
    try {
      vendetta.ui.toasts.showToast(msg);
    } catch (e) {
      console.log("[T1Layout] " + msg);
    }
  }
  return {
    onLoad: function () { toast("T1Layout loaded"); },
    onUnload: function () { toast("T1Layout unloaded"); }
  };
})()
