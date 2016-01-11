let notifier = null;

let setNotifier = function (notif) {
  notifier = notif;
};

let notifyError = function (errObj) {
  if (errObj.response) {
    errObj.response.text()
      .then(errText => {
        notifier.addNotification({
          message: errText,
          level: 'error'
        });
      });
  } else {
    notifier.addNotification({
      message: errObj.message,
      level: 'error'
    });
  }
};

let notifySuccess = function (msg) {
  notifier.addNotification({
    message: msg,
    level: 'success'
  });
};

let checkResponseStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};


export {setNotifier, notifyError, notifySuccess, checkResponseStatus};
