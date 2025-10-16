//configurações e contantes
const CONFIG={
    THEME_KEY: 'portifolio-theme',//chave para usar e salvar no localstorage a preferencia do usuário
    ANIMATION_DURATION: 300,//duração das animações do site(300 milissegundos)
    SCROLL_OFFSET:80 //ajusta o posicionamento da rolage,
}

//classe principal do portifolio
class Portifolio{
    constructor(){ //contrutor inazializa novos objetis
        this.init()
    }
    init(){
        this.setupEventListesners(); //registrarouvintes: reação dos códigos aos cliques e interações do usuário
        this.initTheme();//innicializa o tema do site(claro ou escuro), lendo preferencias salvas
        this.initScrollAnimations();//preparar as animações que serão ativadas quando as seções entrarem na area visivel
        this.initSmoothScrolling();//implemtentar o efeito de rolagem suave
        this.initContactFrom();//configura a lógica e validação do formulario de contato para envio e feedback
        this.initTypingEffect();//efeito visual de digitação em destaque no topo da pagina
    }

    initTheme(){
        const themeToggle= document.getElementById('theme-toggle');
        const body= document.body;
        const themeIcon=document.querySelector('.theme-icon')

        //verificar a preferencia salva no sistema
        const savedTheme= localStorage.getItem(CONFIG.THEME_KEY);
        const prefersDark= window.matchMedia('(prefers-color-sheme: Dark)').matches;

            if (savedTheme==='dark' || (!savedTheme && prefersDark)){
                body.classList.add('dark-mode');
                themeIcon.textContent='☀️';
            }

            themeToggle.addEventListener('click', () =>{
                body.classList.toggle('dark-mode');
                const isdark=body.classList.contains('dark-mode')

                themeIcon.textContent= isdark? '☀️':'🌙';
                localStorage.setItem(CONFIG.THEME_KEY, isDark? 'dark': 'light');

                //animação do icone
                themeIcon.computedStyleMap.tranform='scale(0.8)';
                setTimeout(() =>{ //aguarda 150ms e depois disso executo o código
                    themeIcon.computedStyleMap.tranform='scale(1)'; //restaurei o icone no tamanho
                },150)
        });
    }

        initScrollAnimations() {
            const observerOptions={
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };  

            const observer= new IntersectionObserver((entries)=>{
                entries.forEach(entry =>{
                    if (entry.isIntersecting){
                        entry.target.classList.add('animate-in');

                        //animação especial para estatítias
                        if(entry.target.classList.contains('about-stats')){
                            this.animateStates();
                        }

                        //animação especial para habilidades
                        if(entry.target.classList.contains('skill-catagory')){
                            
                        }
                    }
                })
            })
        }

}
