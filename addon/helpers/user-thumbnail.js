import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function userThumbnail(params /*, hash*/) {
  let user = params[0];

  let src = 'http://placehold.it/350x350',
    alt = 'user thumbnail',
    title = 'user name';

  if (user.get('provider_info.picture')) {
    src = user.get('provider_info.picture');
    alt = user.get('provider_info.name');
    title = user.get('provider_info.name');
  }

  return htmlSafe(
    `<img class="img-avatar" src="${src}" alt="${alt}" title="${title}" />`
  );
}

export default helper(userThumbnail);
