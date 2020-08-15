import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
const fireStore = admin.firestore();

function buildHtmlWithPost(noteObj: { id: string; title: string; image: string }): string {
  return `<!DOCTYPE html><head>
  <title>${noteObj.title}</title>
  <meta property="og:title" content="${noteObj.title}">
  <meta property="og:image" content="${noteObj.image}">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="600">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${noteObj.title}">
  <meta name="twitter:image" content="${noteObj.image}">
  <link rel="canonical" href="/timeline/${noteObj.id}">
  </head><body>
  <script>window.location="/timeline/${noteObj.id}";</script>
  </body></html>`;
}

export const note = functions.https.onRequest(async function (req, res) {
  const path = req.path.split('/');
  const hostname = req.hostname;
  console.log(path);
  const id = path[2];
  fireStore
    .collection('timeline')
    .doc(id)
    .get()
    .then((timeline) => {
      console.log('path', path);
      const data = timeline.data();
      let htmlData = {
        id: '',
        title: '',
        image: '',
      };
      if (data) {
        htmlData = {
          id: timeline.id,
          title: data.simpleProf,
          image: `https://${hostname}${data.miniIcon}`,
        };
      }
      const htmlString = buildHtmlWithPost(htmlData);
      res.status(200).end(htmlString);
    })
    .catch((e) => {
      res.status(404).end('');
    });
});
