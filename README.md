# MultiCalc - Client App

## Deployment to Azure Storage + CDN

To be able to use pretty URLs we have to use URL rewrite capabilities of Verizon CDN.

1. Add a new rule with condition:<br>```IF | Request Header Wildcard | Name | User-Agent | Does Not Match | Values | ECPurge/* | Ignore Case (checked)```.
2. You will need to add a new Feature for each endpoint.
3. For the Pattern, enter ```[^?.]*(\?.*)?$```. This pattern catches URL paths with ```.``` in them, but doesn't care whether or not it's in the query string.
4. For the Path, enter ```origin_path/document.ext```. This is the tricky part. The Path is relative to the origin root. For instance, if your CDN endpoint's origin path is ```/origin_path``` and you want to redirect to ```index.html```, you would enter ```origin_path/index.html```. This will always be the case if your CDN is backed by an Azure Storage Account and the origin points to a container.
5. Click Add to add your rule, wait N hours, and you're good to go.

> The fix for [Azure cdn purge not refreshing cached content](https://stackoverflow.com/questions/45047188/azure-cdn-purge-not-refreshing-cached-content).

