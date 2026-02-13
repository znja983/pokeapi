function Informativa(){
    const root = document.getElementById("root");
    root.innerHTML = "";
    
    const contenido = `
    <section class="c-informativa">
        <h1>Trench Crusade - El Infierno en la Tierra</h1>
        
        <div class="historia">
            <h2>La Maldición Antigua</h2>
            <p>Los Templarios traicionaron a Dios en el siglo XI y abrieron las puertas del infierno. Ahora, en 1914, una guerra eterna consuela la tierra. Las trincheras no separaban solo a naciones, sino a los fieles y los malditos en un conflicto sin fin.</p>
            
            <h2>Las Facciones del Conflicto</h2>
            <h3>⛪ Peregrinos de la Trinchera</h3>
            <p>Los últimos guerreros de la fe. Estos cruzados, sacerdotes y soldados de dios luchan contra las fuerzas infernales con todo lo que tienen. Creen que su victoria redimirá a la humanidad. Su fe es su arma más poderosa.</p>
            
            <h3>👹 Legión Hereje</h3>
            <p>Demonios corporificados y horrores del abismo. Las fuerzas del infierno encarnadas en carne maldita. Buscan consumir la tierra y llevarla a la ruina eterna. Son la encarnación del caos y la corrupción.</p>
            
            <h3>🏰 Principado de Nueva Antioquía</h3>
            <p>Un reino de tecnología profana y magia corrompida. Estos herejes buscan su propio poder, no someterse ni al cielo ni al infierno, sino dominar ambos.</p>

            <h3>🗡️ Sultanato del Muro de Hierro</h3>
            <p>Guerreros malditos del desierto que han hecho pactos con fuerzas oscuras. Avaros de poder y corrupciones antiguas.</p>
            
            <h3>🖤 Culto del Grial Negro</h3>
            <p>Hechiceros y brujas que veneran la ruina. Creen que el fin del mundo es inevitable y deseable. Trabajan para acelerar el apocalipsis.</p>
            
            <h2>La Batalla Eterna</h2>
            <p>En las oscuras trincheras del siglo XI-XX, nada es simple. El honor está muerto, la piedad es debilidad, y solo la supervivencia importa. Pequeños grupos de combatientes luchan en escaramuzas desesperadas, luchando por terreno que no vale nada pero lo significa todo.</p>
            
            <h2>Mecánica de Guerra</h2>
            <p>Esta es una guerra de bandas y unidades pequeñas. No hay ejércitos masivos, solo grupos de guerreros decididos. Cada soldado, sacerdote, demonio y bruja tiene un rol en el conflicto. La supervivencia en las trincheras depende de la táctica, el coraje y, a veces, de la suerte maldita.</p>
        </div>
    </section>
    `;
    
    root.innerHTML = contenido;
}