# Rapor (SearchFlight Challenge)

## Özet

Bu çalışma tamamen **responsive** olacak şekilde görsellere bakarak herhangi bir bootstrap vb. kütüphaneler kullanılmadan kodladım.

**Knockoutjs** (opsiyonel olarak) istendiği için önceden hiç kullanmamış olsamda bu projede dökümantasyonuna baka baka kullandım ve açıkçası çok sevdim. Jquery ile yapmış olsam hayli hayli fazla zaman alırdı. Selector kullanmamak cidden güzelmiş. MVVM paternini Flutter araştırmalarımda görmüştüm webde karşılaşacağım aklıma gelmezdi.

Kabin ve yolcu seçiminde çıkan tooltip tarzında olan popup konumlandırması için **popper** kütüphanesini kullandım.

Opsiyonel olsa da **LocalStorage** stage değerlerini tutmak için kullandım. Kullanıcı kaldığı yerden bu sayede devam edebiliyor.

**Test Driven Development**'a alışkın olmasamda ek olarak olsa güzel olur dediğiniz için **JEST** ile biraz test yazdım.

Düz css yazmak yerine **sass** kullandım ve bu sayede çok daha derli toplu bir proje ortaya çıktı.

Iconları sadece ihtiyaç duyduklarımı **icomoon**'dan seçtim ve böylece çok daha optimize edilmiş bir kaynak kod ortaya çıktı.

## Geliştirme

Tüm npm bağımlılıklarının kurulumu için `npm install` komutu çalıştırılmalıdır. Kolaylık olması için aşağıdaki komutları tek komutta birleştirerek `npm run dev` şeklinde kullanmaktayım.

#### Live Server kullanımı

`npm run liveserver` komutu ile ortamı ayağa kaldırmaktayım.

#### Live Reload kullanımı

`npm run livereload` komutu ile geliştirmelerin anında tarayıcıya yansıması [chrome eklentisi](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) ile birlikte sağlamaktayım.

#### Sass Compiler kullanımı

`npm run sass` komutu ile scss dosyaları otomatik olarak derlemekteyim.

#### Jest kullanımı

`npm run test` komutu ile test işlemlerini gerçekleştirmekteyim.

Sayıgılarımla

[Emircan ERKUL](https://emircanerkul.com/)
