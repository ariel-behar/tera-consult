document.addEventListener('DOMContentLoaded', () => {
    let mainTitleTextContent = document.querySelector('#first-section > div > div.text-content');
    let lawyersImg = document.querySelector('.lawyers-images-div > img')
    
    lawyersImg.style.opacity = 1;
    lawyersImg.style.right = 0;

    mainTitleTextContent.style.opacity = 1;

})

let accountingServices = ['Данъчна Защита', 'Счетоводство', 'Финансов Одит', 'Представителство (ГИТ, НАП, НОИ, КОНПИ)'];

let lawServices = ['Семейно Право', 'Наказателно Право', 'Гражданско Право', 'Правно Представителство'];

function ServiceProvider(image, nickname ,name, profession, experience, services){
    this.image = image;
    this.nickname = nickname;
    this.name = name;
    this.profession = profession;
    this.experience = experience;
    this.services = services;
}

const rudi = new ServiceProvider('ariel.jpg','rudi', 'Радостин Величков', 'Счетоводител', '23', accountingServices);

const stanish = new ServiceProvider('ariel.jpg','stanish','Станиш Златков', 'Адвокат', '25', lawServices);

function indexPageInsertElements(serviceProvider) {

    const serviceProviderDiv = document.getElementById(`index-page-${serviceProvider.nickname}`)

    serviceProviderDiv.insertAdjacentHTML("afterbegin", `<img src="./img/ariel.jpg" alt="${serviceProvider.name} - ${serviceProvider.profession}" class="service-provider-image">`);

    
    const providerName = document.querySelector(`#index-page-${serviceProvider.nickname} > .name`);
    const providerProfession = document.querySelector(`#index-page-${serviceProvider.nickname} > .profession`);
    const providerExperience = document.querySelector(`#index-page-${serviceProvider.nickname} > .experience`);
    const providerServices = document.querySelector(`#index-page-${serviceProvider.nickname} > .services`);


    providerName.textContent = serviceProvider.name;
    providerProfession.textContent = serviceProvider.profession;
    providerExperience.textContent = serviceProvider.experience + ' години опит';
    serviceProvider.services.forEach(item =>{
        providerServices.innerHTML += `<li>${item}</li>`;
    })

}


indexPageInsertElements(rudi);
indexPageInsertElements(stanish);
