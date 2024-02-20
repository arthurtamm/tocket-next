export default function chatLink(phoneNumber) {
    // const now = new Date(Date.now())

    // const currentHour = now.getHours()
    // const compliment = currentHour < 12 ? 'Bom dia' : currentHour > 18 ? 'Boa Noite' : 'Boa Tarde'

    // const priceMessage = price === 'A combinar' ? ' Qual seria o preço?' : ''

    // const text = `${compliment} ${artist?.name}, tudo bem? \n\nEncontrei você através da ShowMarket e estou interessado no seu show ${selectedOption?.title}. Por acaso você teria disponibilidade para tocar${
    //     selectedLocation ? ` em ${selectedLocation.city} ` : ' '
    // }no dia ${selectedDate.toLocaleDateString('pt-br')}?${priceMessage}\n\nAgradeço desde ja!`

    // if (isMobile()) {
    //     return `whatsapp://send?text=${encodeURIComponent(
    //         text,
    //     )}&phone=55${artist?.phone}&type=phone_number&app_absent=0`
    // }

    // return `https://api.whatsapp.com/send?phone=55${phoneNumber}&text=${encodeURIComponent(
    //     text,
    // )}&type=phone_number&app_absent=0`

    return `https://api.whatsapp.com/send?phone=55${phoneNumber}&type=phone_number&app_absent=0`
}

const onReservation = () => {
    const targetUrl = buildReservationLink()

    document.location.href = targetUrl
    }