import styles from './Title.module.css';
import AuthForm from "../_components/AuthForm";
import { PlugZap   } from 'lucide-react';


function Title () {

  return (

    <div className="relative h-[100vh] bg-slate-900 text-4xl flex justify-center">
      <div className="relative flex flex-col items-center text-slate text-lg">
        <div className={`font-serif my-16 w-full font-bold ${styles.text}`} style={{ height: '100px', display: 'flex', alignItems: 'center', marginTop: '50px' }}>
          <PlugZap className="text-yellow-500  " size={80}/>shopEE
        </div>
        <AuthForm />
      </div>
    </div>


  );
};

export default Title;