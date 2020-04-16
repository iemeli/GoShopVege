# GoShopVege

## IDEA

Kauppaan mennessä vegaanista voi tuntua hankalalta ilman selkeätä ostoslistaa. Sovellus generoi käyttäjälle automaattisesti kauppalistan, kun halutaan ruoat X päiväksi kaupasta Y. Keskiössä ovat "ruokapaketit", jotka sisältävät ruokia jotka sisältävät ruoka-aineita. Ruokapaketti kolmelle päivälle voisi näyttää esim. tältä:

| PÄIVÄ | ruoka                   | kcal | hinta € |
| :---: | :---------------------- | :--- | :------ |
|   1   | Linssibolognese         | 800  | 5,20    |
|   2   | Avokadopasta            | 650  | 7,50    |
|   3   | Lämpimät voileivät 9kpl | 1200 | 12,50   |

### Tulevat ominaisuudet

- Ruokapakettien kuvat
- Admin - voi luoda/muokata/poistaa asioita käyttöliittymästä
- Superadmin - samat toiminnallisuudet kuin adminilla + voi lisätä ja poistaa admin-oikeudet sekä lisätä superadmin-oikeudet
- hyperadmin - samat kuin superdaminilla + voi poistaa superadmin-oikeudet
- Käyttäjän rekisteröityminen - Kuka tahansa voi luoda tilin - Luotuaan tilin voi kirjautua - Käyttäjän lempiruoka - Käyttäjän allergeenit - Käyttäjän budjetti viikolle, kuukaudelle .yms
- Ruokapakettien ravintoainemäärä - kuinka paljon protskua, hiilaria yms.
- Ruokapakettien listaus parametrien kanssa - Listaus päivien mukaan - Listaus allergeenien mukaan - Esim. herneallergikkoa ei kiinnosta hernekeitto

### Toteutetut ominaisuudet

- Ainesosien - listaus - lisäys - päivitys - poisto
- Ruokien - listaus - lisäys - päivitys - poisto
- Ruokapakettien - listaus - lisäys - päivitys - poisto
