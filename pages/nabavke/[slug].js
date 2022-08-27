import React,{useEffect} from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import { singleCategorynabavke } from '../../actions/categorynabavke';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';
import NabavkeMenu from '../../components/nabavke/NabavkeMenu';
import styles from '../../styles/nabavke.module.css'
import ScrollToTop from '../../components/ScroolToTop';

const Categorynabavke = ({ categorynabavke, nabavkes, query }) => {
    
    return (
<>  
<Layout>
<div className="container-fluid  " style={{minHeight:'55vh'}}  >
         <div className='pt-4 pb-4'>
     <div className={styles.containerGrid}>

     <div className=' '>
         <div className='container-fluid' >
             <div className=''>
        <h2 className=" font-weight-bold pl-4 text-muted pr-4 text-uppercase  " style={{color:'#5ab9ea'}}>{categorynabavke.nameSp}</h2>          
          <div>
             {nabavkes.length === 0 ? <p className='text-muted pt-4 pl-4' style={{textTransform:'uppercase',fontSize:''}}>
                  Trenutno nema nabavki </p> :
             <p className='text-muted pl-4 ' style={{textTransform:'uppercase',fontSize:'small',textAlign:''}} >
             укупно набавки:{" "} <b style={{fontSize:'medium'}}> {nabavkes.length} </b> </p>}
                 </div>  
                 <div className='pl-4'>
                     {categorynabavke.name === 'javne nabavke' ? <p style={{color:'#5ab9ea',textTransform:'uppercase'}}>све јавне набавке завода за биоцид и медицинску екологију можете пронаћи на <a href='https://jnportal.ujn.gov.rs/' target='_blanck' style={{cursor:'pointer',color:'#5ab9ea'}}><b> порталу јавних набавки</b></a> </p> : null}
                 </div>
           <div className={styles.gridSistem}  >
           {nabavkes.map((n, i) => (
                                           <ul  key={i}  className={styles.nabavke}>
                                           <li style={{fontSize:'large',marginBottom:'2%',textTransform:'none'}}> <a href={`${API}/nabavke/dokument/${n.slug}`}  className='text-white' //style={{color:'#5ab9ea',fontSize:'larger'}}
                                            >
                                                                      {n.titleSp} </a> </li>
                                                                       <li > {n.sifra === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>шифра</b><b style={{color:'white',textAlign:'right'}} > {n.sifra}</b></a>}</li>
                                            <li >{n.pocetak === 'undefined' ? null : <a className={styles.smallGrid} ><b className='text-muted'>датум објаве </b><b style={{color:'white',textAlign:'right'}}>{moment(n.pocetak).locale('sr').format('DD-MM-YYYY')}</b></a>} </li>
                                            <li >{n.kraj === 'undefined' ? null :  <a className={styles.smallGrid} ><b className='text-muted'>рок за доставу понуда</b> <b style={{color:'white',textAlign:'right'}}>{moment(n.kraj).locale('sr').format('HH:mm  DD-MM-YYYY ')}</b></a>}</li>
                                            <li><a className={styles.smallGrid} ><b className='text-muted'> контакт / понуде</b> 
          <b style={{color:'white',textAlign:'right'}}>{n.postedBy.email}</b></a></li>
                                                  </ul>
                                ))}
           </div>      
         </div>
     </div>
    </div> <div className={styles.menuBorder} >
   <NabavkeMenu/>
</div> 
</div>      
 </div>
  </div> <ScrollToTop/>
    </Layout>
            </>
    );
};




Categorynabavke.getInitialProps = ({ query }) => {
    return singleCategorynabavke(query.slug).then(data => {
       if (data.error) {
           console.log(data.error); } 
          //  if (data === undefined){
             //   null
           // }
            else {
            return { categorynabavke: data.categorynabavke, nabavkes: data.nabavkes, query };
        }
    });
};

export default Categorynabavke;