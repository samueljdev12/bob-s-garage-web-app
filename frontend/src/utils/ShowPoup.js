export function showPopup(name, path, navigateCallback, modalContent) {
  var $modal = $(`#${name}`);
  var $modalTitle = $modal.find('.modal-title');
  var $modalBody = $modal.find('.modal-body');
  var $modalFooter = $modal.find('.message');

  // Set modal content
  if ($modalTitle.length) {
    $modalTitle.text(modalContent.title || '');
  }

  if ($modalBody.length) {
    $modalBody.text(modalContent.body || '');
  }

  if ($modalFooter.length) {
    $modalFooter.text(modalContent.footer || '');
  }

  $modal.modal('show');

  setTimeout(() => {
    $modal.modal('hide');
    navigateCallback(path);
  }, 3000);
}
