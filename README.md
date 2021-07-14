# DFINITY-Vue

[![Mentioned in Awesome DFINITY](https://awesome.re/mentioned-badge.svg)](https://github.com/dfinity/awesome-dfinity)
[![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/organization/repository)

<p align="center">
  <img src="logos.png">
</p>

Integration of [Vue.js][vue] with the default [DFINITY SDK][sdk] [bootstrap webpack project][project]. There is also an integration with [Vuetify][] in its own branch: [`vuetify`][vuetify-branch].

## Docs and resources

I documented the process of integrating both Vue and Vuetify in my respective blog posts:

- [Integrating Vue.js with DFINITY SDK Bootstrap project - Part 1][blog post part 1]
- [Integrating Vue.js with DFINITY SDK Bootstrap project - Part 2: Adding Vuetify][blog post part 2]

See the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)

If the docs are not helping, these are other resources you can draw inspiration from:

- [Awesome DFINITY repository](https://github.com/dfinity/awesome-dfinity)
- [DFINITY examples](https://github.com/dfinity/examples)

If nothing helps and you are stuck, these are places you can go ask for guidance:

- [DFINITY forum](https://forum.dfinity.org/)
- [DFINITY Devs Telegram channel](https://t.me/DFINITY_Devs)

## Troubleshooting

### Missing node signing public key

Restart the DFX network with:

```
dfx start --clean
```

The `--clean` option removes checkpoints and stale state information from your project’s cache so that you can restart the Internet Computer replica and web server processes in a clean state.

### How to upgrade the SDK

To upgrade from a previous SDK version, run:

```
dfx upgrade
```

For a clean installation instead of an upgrade, run:

```
~/.cache/dfinity/uninstall.sh && sh -ci "$(curl -sSL https://sdk.dfinity.org/install.sh)"
```

[vue]: https://vuejs.org/
[sdk]: https://sdk.dfinity.org/docs/index.html
[project]: https://sdk.dfinity.org/docs/developers-guide/tutorials/explore-templates.html
[vuetify]: https://vuetifyjs.com/
[vuetify-branch]: https://github.com/nop33/dfinity-vue/tree/vuetify
[blog post part 1]: https://www.iliascreates.com/integrating-vue-dfinity-sdk/
[blog post part 2]: https://www.iliascreates.com/integrating-vuetify-dfinity-sdk/
