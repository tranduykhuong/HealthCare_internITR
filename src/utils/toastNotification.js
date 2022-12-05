import toastr from 'toastr';

export const toastrInfo = (message, title) => {
  toastr.info(message, title, {
    progressBar: false,
    positionClass: 'toast-bottom-left',
    preventDuplicates: true,
  });
};

export const toastrSuccess = (message, title) => {
  toastr.success(message, title, {
    progressBar: false,
    positionClass: 'toast-bottom-left',
    preventDuplicates: true,
  });
};

export const toastrError = (message, title) => {
  toastr.error(message, title, {
    progressBar: false,
    positionClass: 'toast-bottom-left',
    preventDuplicates: true,
  });
};
