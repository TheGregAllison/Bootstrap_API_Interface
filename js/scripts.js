let pokemonRepository = (function () {
  let e = [],
    t = document.querySelector('.modal-container');
  function n(e) {
    i(e);
    let n = document.querySelector('.pokemon-list'),
      s = document.createElement('li'),
      a = document.createElement('button'),
      d = e.name.charAt(0).toUpperCase(),
      o = e.name.slice(1);
    (a.innerText = d + o),
      a.classList.add('list-group-item'),
      s.classList.add('mt-2'),
      a.classList.add('btn-block'),
      a.classList.add('col-10'),
      a.classList.add('mx-auto'),
      s.appendChild(a),
      n.appendChild(s),
      a.addEventListener('click', function () {
        var n;
        let s, i, a, d, o, c, r, p;
        (n = e),
          (t.innerHTML = ' '),
          (s = document.createElement('div')).classList.add('modal'),
          s.classList.add('modal-content'),
          (i = document.createElement('button')).classList.add('modal-close'),
          (i.innerText = 'X'),
          i.addEventListener('click', l),
          (a = document.createElement('h2')).classList.add('modal-header'),
          a.classList.add('text-left'),
          (d = n.name.charAt(0).toUpperCase()),
          (o = n.name.slice(1)),
          (a.innerText = d + o),
          (c = document.createElement('p')).classList.add('modal-body'),
          c.classList.add('text-left'),
          (c.innerText = 'Height: ' + n.height),
          (r = document.createElement('p')).classList.add('modal-body'),
          r.classList.add('text-left'),
          n.types.length < 2
            ? (r.innerText = 'Type: ' + n.types)
            : (r.innerText = 'Types: ' + n.types.join(', ')),
          (p = document.createElement('img')).setAttribute('src', n.imageUrl),
          p.setAttribute('width', 150),
          p.classList.add('center-block'),
          p.classList.add('image-center'),
          s.appendChild(i),
          s.appendChild(p),
          s.appendChild(a),
          s.appendChild(c),
          s.appendChild(r),
          t.appendChild(s),
          t.classList.add('is-visible');
      });
  }
  async function s() {
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
      .then(function (e) {
        return e.json();
      })
      .then(function (e) {
        e.results.forEach(function (e) {
          n({ name: e.name, detailsUrl: e.url });
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  async function i(e) {
    return fetch(e.detailsUrl)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = []);
        for (var n = 0; n < t.types.length; n++)
          e.types.push(t.types[n].type.name);
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function a() {
    return e;
  }
  function l() {
    t.classList.remove('is-visible');
  }
  return (
    window.addEventListener('keydown', (e) => {
      'Escape' === e.key && t.classList.contains('is-visible') && l();
    }),
    t.addEventListener('click', (e) => {
      e.target === t && l();
    }),
    {
      getAll: a,
      loadList: s,
      loadDetails: i,
      addListItem: n,
      showDetails: function e(t) {
        i(t).then(function () {
          console.log(t);
        });
      },
    }
  );
})();
window.addEventListener('scroll', function () {
  let e = document.querySelector('.navbar');
  window.scrollY > 50
    ? e.classList.add('scrolled')
    : e.classList.remove('scrolled');
}),
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (e) {
      pokemonRepository.addListItem(e);
    });
  });
