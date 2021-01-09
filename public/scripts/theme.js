// Template da lista de temas {light:'',dark:''}
var themes = [{light:'bg-white',dark:'bg-s_dark'},{light:'text-black',dark:'text-white'},{light:'text-dark',dark:'text-light'},{light:'text_principal_light',dark:'text_principal_dark'},{light:'bg-white-50',dark:'bg-s_dark-50'}]
var svg_theme = ['creator_btn','notifi_btn']

function load(){
    if(localStorage.theme == 'light'){
        change_theme('light')
    }else if(localStorage.theme == 'dark'){
        change_theme('dark')
    }else{
        localStorage.setItem('theme', 'dark');
    }
}

load();

function indentify_theme() {
    theme = $('#theme').html();
    if (theme == 'light') {
        change_theme('dark')
    }
    if (theme == 'dark') {
        change_theme('light')
    }
}

function change_theme(to_theme) {
    if(to_theme == 'light'){
        for(nowtheme of themes){
            $('.'+nowtheme.dark).addClass(nowtheme.light);
            $('.'+nowtheme.dark).removeClass(nowtheme.dark);
        };
        for(now_svg of svg_theme){
            document.getElementById(now_svg).querySelector("svg").style.fill = 'black';
        };
        $('#theme_button').html('<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="20" viewBox="0 0 24 24" width="20"><rect fill="none" height="24" width="24"/><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>');
        $('#theme').text('light');
        localStorage.setItem('theme', 'light');
    }
    if(to_theme == 'dark'){
        for(nowtheme of themes){
            $('.'+nowtheme.light).addClass(nowtheme.dark);
            $('.'+nowtheme.light).removeClass(nowtheme.light);
        };
        for(now_svg of svg_theme){
            document.getElementById(now_svg).querySelector("svg").style.fill = 'white';
        }
        $('#theme_button').html('<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="white" width="20px" height="20px"><rect fill="none" height="24" width="24"/><path d="M11.01,3.05C6.51,3.54,3,7.36,3,12c0,4.97,4.03,9,9,9c4.63,0,8.45-3.5,8.95-8c0.09-0.79-0.78-1.42-1.54-0.95 c-0.84,0.54-1.84,0.85-2.91,0.85c-2.98,0-5.4-2.42-5.4-5.4c0-1.06,0.31-2.06,0.84-2.89C12.39,3.94,11.9,2.98,11.01,3.05z"/></svg>');
        $('#theme').text('dark');
        localStorage.setItem('theme', 'dark');
    }
}