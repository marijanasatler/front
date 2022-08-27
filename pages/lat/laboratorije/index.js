import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../../components/layout/LayoutLat';
import { useState,useEffect } from 'react';
import { list } from '../../../actions/laboratori';
import { API, DOMAIN,APP_NAME } from '../../../config';
import styles from '../../../styles/laboratorije.module.css'
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from '../../../components/ScroolToTop';

const Laboratoris = ({router}) => {

  const head = () => (
    <Head>
        <title> Laboratorije | {APP_NAME}</title>
        <meta
            name="description"
            content="Sve laboratorije zavoda za biocide i medicinsku ekologiju"
        />
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Sve laboratorije | ${APP_NAME}`} />
        <meta
            property="og:description"
            content="Sve laboratorije zavoda za biocide i medicinsku ekologiju" />
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
     
    </Head>
);



    const [loading,showLoading] = useState(true  );
    const [laboratoris, setLaboratoris] = useState([]);
    useEffect(() => {
        loadLaboratoris();  
         AOS.init({
            duration : 2000
          });
          AOS.refresh();

    }, []);

    const loadLaboratoris = () => {
        list().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setLaboratoris(data);
                showLoading(false);
            }
        });
    };
 
    const Loading = () => (loading ? <div className={styles.loading}>  <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h5  >Stranica se učitava, molimo sačekajte</h5></div> : null);

    const showLoadedLaboratoris = () => {
        return laboratoris.map((l,i) => (
        <div   key={i} className='m-4'>
            <figure className={styles.snip1190} >
          <img alt="laboratorija" src={`${API}/laboratori/photo/${l.slug}`}   onError={image => (image.target.src = `${DOMAIN}/static/images/piggybanner1.png`)}   />
            <figcaption>
              <div> <h3 className='p-4  '>{l.title}</h3>  </div>
                <p className='pt-2 '> <Link href={`/lat/laboratorije/${l.slug}`}><button className='btn  btn-small p-2 col-md-8' style={{backgroundColor:'#8860d0',padding:'0',color:'white'}}>POGLEDAJ VIŠE</button></Link></p>
            </figcaption>
        </figure>
        </div>

          ))
    };

    return (
        <React.Fragment>
          {head()}
            <Layout>
                <div className='container-fluid'>
                {Loading()}
             <div  className={styles.laboratory} >
             {showLoadedLaboratoris()}
     </div>
    </div><ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};


export default withRouter(Laboratoris);