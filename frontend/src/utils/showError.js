export function showContainerError(errorMessage) {
  var containerError = $('#show'); // Use jQuery selector
  if (containerError.length) {
    containerError.text(errorMessage);
    containerError.fadeIn();
  }
}