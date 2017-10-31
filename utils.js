var pages = document.getElementsByClassName('page');

function showPage(pageName) {
  for(var page of pages) {
    page.style.display = 'none';
  }
  document.getElementById('page-'+pageName).style.display = 'block';
}
