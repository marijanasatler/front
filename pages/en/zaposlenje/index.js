import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../../../components/layout/LayoutEn';
import { useState,useEffect } from 'react';
import { listZaposlenje } from '../../../actions/zaposlenje';
import { DOMAIN,APP_NAME,API } from '../../../config';
import moment from 'moment';
import styles from '../../../styles/ostalo.module.css'
import ScrollToTop from '../../../components/ScroolToTop';
const Zaposlenje = ({router}) => {



    const head = () => (
        <Head>
        <title>Job listings | {APP_NAME}</title>
        <meta
            name="description"
            content={`All Job listings | ${APP_NAME} `}/>
        <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
        <meta property="og:title" content={`Job listings |  ${APP_NAME}`} />
        <meta property="og:description" content={`All Job listings | ${APP_NAME} `}/>
        <meta property="og:type" content="webiste" />
        <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta property="og:image" content={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/zavodlogo.png`} />
        <meta property="og:image:type" content="image/png" />
    </Head>
    );







const [zaposlenjes, setzaposlenjes] = useState([]);
    useEffect(() => {
        loadzaposlenjes();
    }, []);

    const loadzaposlenjes = () => {
        listZaposlenje().then(data => {
         // if(data === undefined){
        //    null
         // }
           if (data.error) {
               console.log(data.error); }
             else {
                setzaposlenjes(data);
            }
        });
    };


    const showLoadedzaposlenje = () => {
        return zaposlenjes.map((z,i) => (
        
            <div key={i} className={styles.zaposlenje} >
            <a href={`/en/zaposlenje/${z.slug}`} style={{textDecoration:'none'}}  >
            <figure className='  text-muted'  ><div className='p-1 pb-0'>
            <img alt=""    src={`${DOMAIN}/static/images/logo1.png`}/>
            </div>
           
        <hr className=''/>
           <ul className='' style={{listStyle:'none',fontSize:'small',textTransform:'uppercase',padding:'0'}}>
          <li className='mb-2'>   <b className='' style={{fontSize:'larger'}}>{z.titleEn}</b ></li>
           <li > {z.sifra === 'undefined' || null || '' ? null : <a className={styles.smallGrid} ><b className='text-muted'>ad code</b><b style={{color:'darkgreen',textAlign:'right'}} > {z.sifra}</b></a>}</li>
          <li >{z.pocetak === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>publication date </b><b style={{color:'darkgreen',textAlign:'right'}}>{moment(z.pocetak).locale('sr').format('DD.MM.YYYY')}</b></a>} </li>
          <li >{z.kraj === 'undefined' ? null :  <a className={styles.smallGrid} ><b className='text-muted'>application deadline </b> <b style={{color:'darkgreen',textAlign:'right'}}>{moment(z.kraj).locale('sr').format(' DD.MM.YYYY / HH:mm ')}</b></a>}</li>
                </ul>
        </figure>
      </a>
        </div>
    
        
          ))
    };




    return (
        <React.Fragment>
       {head()}
            <Layout>
            <div className='container-fluid   ' style={{minHeight:'40vh',padding:'.5% 3%'}}>
            {zaposlenjes.length === null ?
                 <div>
                <div>
                    <h3  className='m-3  text-center' style={{textTransform:'uppercase',color:'rgb(26, 28, 26,.4)'}}>the institute for biocides and medical ecology currently has no open job vacancies</h3>
                 </div>
                </div>
            : 
             <div className='pt-4 pb-4' style={{minHeight:'50vh'}} >
                <div>
                 <h3  className='ml-4 mr-4' style={{textTransform:'uppercase',color:'rgb(26, 28, 26,.4)'}}>job ads for the Institute for Biocides and Medical Ecology</h3>
                    </div>
             <div className={styles.gridSistem}>
    
             {showLoadedzaposlenje()}
          </div>
         </div>}
          </div>
          <ScrollToTop/>
            </Layout>
        </React.Fragment>
    );
};


export default withRouter(Zaposlenje);