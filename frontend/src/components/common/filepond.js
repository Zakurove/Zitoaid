// Register filepond plugins
 registerPlugin(
   FilePondPluginImageExifOrientation,
   FilePondPluginImagePreview,
 );

 FilePond.parse(document.body);
 console.log("I am alive!");
