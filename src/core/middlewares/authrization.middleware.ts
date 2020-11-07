'use strict';
export const hasAcsses = (context: any, souldAuth: boolean , role: string[]) =>
  new Promise<any>((resolve, reject) => {
    setTimeout(function (): void {

      if(souldAuth === true ){

        const hasPrimission = role.includes(context.user.role);

      }else{






      }





    /*  if (!hasPrimission) {
        reject('NOT_AUTORIZE');
      }
    */
      resolve();

    }, 1000);
  });
