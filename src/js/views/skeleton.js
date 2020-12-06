export default function getSkeletonScreen() {
  let items = '';

  const item = `
    <li class="group_item col3">
      <a class="group_item_link">
        <div class="card">
          <div class="card_icon loading"></div>
          <div class="card_body">
            <h4 class="card_title loading"></h4>
            <p class="card_text loading"></p>
          </div>
        </div>
      </a>
    </li>
  `;

  for(let i = 0; i < 20; i++) {
    items += item;
  }

  return `
    <section class="group" >
      <h3 class="group_title loading"></h3>
      <div class="group_content">
        <ul class="row group_items">
          ${items}
        </ul>
      </div>
    </section>
  `;
}

