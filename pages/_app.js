import '../styles/globals.css';
import * as gtag from '../lib/gtag';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <script
        src="https://cc.cdn.civiccomputing.com/9/cookieControl-9.x.min.js"
        strategy="afterInteractive"
        async
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var config = {
              apiKey: 'API_KEY',
              product: 'community',
              optionalCookies: [
                {
                  name: 'analytics',
                  label: 'Analytics',
                  description: 'Analytical cookies help us to improve our website by collecting and reporting information on its usage.',
                  cookies: [],
                  onAccept : function(){
                    // Enable Google Analytics
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtag.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                      cookie_flags: 'SameSite=None;Secure'
                    });
                  },
                  onRevoke: function(){
                    // Disable Google Analytics
                    window['ga-disable-${gtag.GA_TRACKING_ID}'] = true;
                  }
                },{
                  name: 'marketing',
                  label: 'Marketing',
                  description: '',
                  cookies: [],
                  onAccept : function(){}, // This function is not needed
                  onRevoke: function(){} // This function is not needed
                },{
                  name: 'preferences',
                  label: 'Preferences',
                  description: '',
                  cookies: [],
                  onAccept : function(){},
                  onRevoke: function(){}
                }
              ],
              position: 'RIGHT',
              theme: 'DARK'
            };
            window.addEventListener('load', function () {
              window.CookieControl.load(config);
            });
          `,
        }}
        strategy="afterInteractive"
      />
      <script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        strategy="afterInteractive"
        async
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
        }}
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
