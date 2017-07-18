function metaUtils(meta = {}) {
  const _meta = {
    title: 'Fraseary Frases Palabras Citas Refranes y Proverbios',
    description: 'Fraseary es un repositorio de frases citas refranes y proverbios que inspiran a pensar sobre amor amistad humanidad',
    url: 'http://fraseary.com'
  };
  if (!meta.og) {
    meta.og = {
      title: _meta.title,
      description: _meta.description
    };
  }

  return {
    title: meta.title || _meta.title,
    description: meta.description || _meta.description,
    url: meta.url ? _meta.url + meta.url : _meta.url,
    og: {
      title: meta.og.title || _meta.title,
      description: meta.og.description || _meta.description
    }
  };
}

module.exports = metaUtils;
