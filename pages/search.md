---
permalink: /search/
layout: page
title: "Search for project"
sitemap: false
---

<!-- {% include _google_search.html %} -->
<!-- Html Elements for Search -->
<div id="search-container">
<input type="text" id="search-input" placeholder="search...">
<ul style="margin-left: 0px;" id="results-container"></ul>
</div>

<!-- Configuration -->
<script>
SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: 'https://lyqht.github.io/istd-1d-exhibition-2020/search.json',
  searchResultTemplate: '<div class="medium-4 columns t30"><a href="{url}"><img src="{related_image}" /><h5>{title}</h5> <p>{subheadline}</p></a></div>'
})
</script>