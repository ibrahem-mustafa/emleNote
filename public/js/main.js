/****** GLOBAL SCRIPTS *******/

const q = (ele,parent)=>{
    let element;
    if (parent) {
        element = parent.querySelector(ele)
    } else {
        element = document.querySelector(ele);
    }

    if (element) {
        return element
    }
};

const qa = (ele)=>{
    let elements = document.querySelectorAll(ele) ;
    if (elements) {
        return elements
    }
};

const s = (ele,st)=>{
    if (st) {
        if (typeof st === 'object'){
            let e;
            if (typeof ele === 'string') {
                e = qa(ele);
            } else {
                if (ele.length !== undefined) {
                    e = ele;
                } else {
                    e = [ele]
                }
            }

            e.forEach((e)=>{
                Object.entries(st).forEach((s)=>{
                    e.style[s[0]] = s[1]
                });
            });
        } else {
            const err = new Error('All Styles Must Be In An Object ==> {} ');
            console.log(err)
        }
    } else {
        const err = new Error('There Is No Styles To Confirm');
        console.log(err)
    }
};

/****** END GLOBAL SCRIPTS *******/

/****************************************************************/
/****************************************************************/

/****** STYLE SCRIPT ******/

const p = q('body').classList;

if (p.contains('index')) {
    let ph = q('.pageHeader'),
        html = q('html');
    ph.style.height = html.clientHeight + 'px';
}


if (p.contains('ad') && p.contains('home')) {
    let sbCont = q('.sb .sbContent'),
        sbInput = q('.sb .sbInput'),
        li = qa('.sb ul li');


    sbInput.onkeyup = () => {

        if (sbInput.value === '')
        {
            s(sbCont,{
                height : '0',
                opacity : '0',
                visibility : 'hidden'
            });

        } else {
            s(sbCont,{
                height : sbCont.scrollHeight+'px',
                opacity : '1',
                visibility : 'visible'
            });

        }
        li.forEach((li)=>{
            if (li.textContent.indexOf(sbInput.value) > -1) {
                li.style.display = ""
            } else {
                li.style.display = 'none'
            }
        })
    };

    li.forEach((li)=>{
      li.addEventListener('click',()=>{
          sbInput.value = li.textContent;
          s(sbCont,{
              height : '0',
              opacity : '0',
              visibility : 'hidden'
          });
          sbInput.blur()
      })
    })


}

/****** STYLE SCRIPT ******/