export const setUser = function ($email, hasWeb3, lastUpdated, userEntryRoute) {
  let user = {
    $email,
    hasWeb3,
    lastUpdated,
    userEntryRoute
  }

  return user
}

export const trackContact = function (sourceComponent, sourcePageLocation, sourcePath) {
  let name = 'Contact'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackFooterLogoDownload = function (sourcePath) {
  let name = 'Footer - Logo Download'
  let data = {
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackFooterSubmit = function (sourcePath) {
  let name = 'Footer - Submit'
  let data = {
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackHomeHeroCta = function (targetCta) {
  let name = 'Home Hero CTA'
  let data = {
    targetCta
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackMenu = function (sourcePath, targetMenuItem) {
  let name = 'Menu'
  let data = {
    sourcePath,
    targetMenuItem
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackMetamaskCta = function (sourceComponent, sourcePath) {
  let name = 'Metamask CTA'
  let data = {
    sourceComponent,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackNewsletterSubscribe = function (email, sourceComponent, sourcePath) {
  let name = 'Newsletter - Subscribe'
  let data = {
    email,
    sourceComponent,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPageAbout = function (sourceComponent, sourcePageLocation, sourcePath) {
  let name = 'About page'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPageTerms = function (sourceComponent, sourcePageLocation, sourcePath) {
  let name = 'Terms page'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPublicListView = function (listUrl, sourcePath) {
  let name = 'Public List - View'
  let data = {
    listUrl,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackPublicListCreate = function (listUrl, slug) {
  let name = 'Public List - Create'
  let data = {
    listUrl,
    slug
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackScatterCta = function (sourceComponent, sourcePath) {
  let name = 'Scatter CTA'
  let data = {
    sourceComponent,
    sourcePath
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackSearchSuggestion = function (sourcePath, suggestion) {
  let name = 'Search - Suggestion'
  let data = {
    sourcePath,
    suggestion
  }

  const action = {
    name,
    data
  }

  return action
}

export const trackSocial = function (sourceComponent, sourcePageLocation, sourcePath, targetPlatform) {
  let name = 'Social'
  let data = {
    sourceComponent,
    sourcePageLocation,
    sourcePath,
    targetPlatform
  }

  const action = {
    name,
    data
  }

  return action
}
