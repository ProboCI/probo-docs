---
layout: "docs"
title: Recipes
class: documentation
permalink: /recipes/
published: true
---

{% assign recipes = site.recipes | sort: "name" %}

<div id="recipes" class="recipes">
  <input class="search recipes__search" title="Search for recipes" placeholder="Search for recipes" />
  <ul class="list recipes__list">
    {% for recipe in site.recipes %}
    <li>
      <h3 class="name recipes__name">{{recipe.title}}</h3>
      {% if recipe.author %}
        <p>
            <em>
              This recipe was generously contributed by
              {% if recipe.github %}
                <a href="https://github.com/{{recipe.github}}">{{ recipe.author }}.</a>
              {% else %}
                {{ recipe.author }}.
              {% endif %}
            </em>
        </p>
      {% endif %}
       <div class="recipe recipes__recipe">{{recipe.output}}</div>
    </li>
    {%endfor%}
  </ul>
</div>
