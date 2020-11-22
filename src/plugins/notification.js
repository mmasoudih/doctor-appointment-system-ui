import Noty from "noty";

function noty({ message, type }) {
  return new Noty({
    text: message,
    timeout: 4000,
    type: type,
    layout: "bottomLeft"
  }).show();
}
// function toast ({ message, type, timeout}) {
//   if (type === VueNotifications.types.warn) type = 'warning'
//   return new Noty({text: message, timeout, type, layout: 'bottomLeft'}).show()
// }

// const options = {
//   success: toast,
//   error: toast,
//   info: toast,
//   warn: toast
// }

// Vue.use(VueNotifications, options)
export default noty;
