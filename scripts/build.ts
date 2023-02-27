Object.assign(
  require('rewire')('react-scripts/scripts/build.js').__get__('config').optimization
    .minimizer[0].options.terserOptions || {},
  {
    keep_classnames: true,
    keep_fnames: true,
  },
);