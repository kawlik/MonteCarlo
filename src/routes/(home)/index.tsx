export default function () {
	// component logic

	// component layout
	return (
		<article class="flex flex-1 flex-col gap-2 p-4 max-w-screen-xl mx-auto">
			<h2 class="text-2xl">Metoda Monte Carlo</h2>
			<p class="text-lg text-justify">
				Metoda Monte Carlo to technika numeryczna wykorzystywana do rozwiązywania
				problemów za pomocą symulacji losowych zdarzeń. Nazwa pochodzi od słynnego
				kasyna Monte Carlo w Monako, które jest znane ze swoich gier hazardowych
				opartych na czystym szczęściu. Metoda Monte Carlo jest stosowana w różnych
				dziedzinach, takich jak fizyka, statystyka, inżynieria, ekonomia i biologia. Jej
				głównym celem jest generowanie próbek losowych w celu estymacji wartości
				oczekiwanej lub rozwiązania problemów, które są trudne do rozwiązania
				analitycznie lub deterministycznie.
			</p>
			<hr class="my-4" />
			<h2 class="text-2xl">Przykładowe zastosowania</h2>
			<ol class="list-decimal pl-8">
				<li class="list-item text-xl">
					<h3>Obliczanie wartości liczby π</h3>
					<p class="text-lg text-justify">
						Metoda Monte Carlo może być wykorzystana do obliczania przybliżonej
						wartości liczby π poprzez symulację losowych punktów na płaszczyźnie.
						Procedura polega na wpisaniu okręgu o promieniu 0.5 w kwadrat o boku 1,
						gdzie środek okręgu pokrywa się ze środkiem kwadratu. Następnie,
						generuje się dużą liczbę punktów losowych wewnątrz kwadratu, czyli z
						przedziału [0, 1]. Wybierając te punkty losowo, sprawdza się, czy każdy
						z nich znajduje się również wewnątrz okręgu, obliczając odległość od
						środka kwadratu. Oblicza się stosunek liczby punktów, które trafiły
						wewnątrz okręgu, do całkowitej liczby wygenerowanych punktów. Ostateczne
						przybliżenie liczby π można uzyskać, mnożąc ten stosunek przez 4,
						ponieważ stosunek pól okręgu i kwadratu wynosi 1/4. Im większa liczba
						punktów wygenerowana w symulacji, tym dokładniejsze przybliżenie
						otrzymamy dla liczby π.
					</p>
					<p class="mt-2 text-lg text-justify">
						Zastosowanie to można jednak uznać za wysoce niepraktyczne do realnej
						aplikacji, gdyż raz obliczona stała może po prostu zostać zapamiętana.
						Ponadto, do obliczania wartości stałych (takich jak liczba π), o wiele
						lepiej nadają się algorytmy szybkozbieżne i dokładne, które pozwalają na
						precyzyjne wyznaczenie szukanej wartości. Nie ma więc potrzeby
						rozwijania tej metody do obliczania pewnych wartości stałych.
					</p>
					<p class="mt-2 text-lg text-justify text-blue-600">
						<a href="/calculate-pi">Pokaż demo</a>
					</p>
				</li>
				<li class="list-item text-xl mt-4">
					<h3>Obliczanie całek oznaczonych ∫f(x)</h3>
					<p class="text-lg text-justify">
						Metoda Monte Carlo może być również wykorzystana do obliczania
						przybliżonej wartości całki oznaczonej z funkcji, zwłaszcza w przypadku,
						gdy funkcja jest trudna do całkowania analitycznie lub gdy przedział
						całkowania jest skomplikowany. Cała procedura jest odpowiednio bardziej
						złożona, gdyż wpierw należy wyznaczyć całkowany obszar jako dwa
						prostokąty: jeden dla wartości dodatnich, a drugi dla ujemnych.
						Prostokąty te mają taką samą długość, która to jest przedziałem
						całkowania [x0, x1]. Ich wysokość wyznacza się odpowiednio jako
						największą lub najmniejszą wartość funkcji na zadanym przedziale.
						Wyznaczone w ten sposób prostokąty ograniczające gwarantują, iż pole
						całkowanej funkcji będzie nie większe, aniżeli pole wyznaczonego
						prostokąta. Pozwala to na zastosowanie bardzo podobnego algorytmu
						statystycznego, jak w wypadku obliczania wartości liczby π. Odpowiednie
						pole (dodatnie/ujemne) obliczyć możemy jako iloczyn pola właściwego
						prostokąta ograniczającego i stosunku wygenerowanych losowych punktów
						znajdujących się pod lub nad wykresem całkowanej funkcji.
					</p>
					<p class="mt-2 text-lg text-justify">
						W rzeczywistości zastosowanie to uznać należy za mocno niepraktyczne,
						gdyż istnieją inne numeryczne szybkozbieżne algorytmy wyznaczania całek
						oznaczonych. Za przykład takiego algorytmu uznać można metodę trapezów,
						który na ogół chuje się lepszą precyzją przy podobnym nakładzie
						obliczeniowym. Nie ma więc potrzeby rozwijania tej metody do obliczania
						wartości całek oznaczonych w wypadku, gdy znamy zależność (funkcję)
						zachodzącą pomiędzy kolejnymi punktami pomiarowymi.
					</p>
					<p class="mt-2 text-lg text-justify text-blue-600">
						<a href="/calculate-func">Pokaż demo</a>
					</p>
				</li>
				<li class="list-item text-xl mt-4">
					<h3>Obliczanie całek funkcji nieznanych</h3>
					<p class="text-lg text-justify">
						Obliczenie całki funkcji, której nie znamy w sposób analityczny, jest
						zadaniem o wiele większej złożoności, aniżeli obliczanie całek znanych
						nam funkcji. Standardowe metody numeryczne mogą okazać się
						niewystarczające, lub wymagające analizy większej części puntów
						pomiarowych. Może się to okazać dalece niewystarczające, zwłaszcza w
						sytuacji fizycznych ograniczeń interfejsów I/O. W takim wypadku metoda
						Monte Carlo pozwala na osiągnięcie zadowalających rezultatów, przy
						wykorzystaniu niewielkiej części zbioru punktów pomiarowych. Proces ten
						polega na wybraniu pewnej liczby punktów losowych ze zbioru danych i
						obliczeniu stosunku wybranych punktów względem ich klasyfikacji.
					</p>
					<p class="text-lg text-justify">
						Przykładem takiego zastosowania jest obliczanie przybliżonych wartości
						pól różnych figur na płaszczyźnie. Proces ten polega na wygenerowaniu
						dużej liczby punktów losowych na płaszczyźnie i sprawdzeniu, czy każdy
						punkt znajduje się wewnątrz figury. Następnie oblicza się stosunek
						liczby punktów, które trafiły do wnętrza figury, do całkowitej liczby
						wygenerowanych punktów. Ostateczne przybliżenie pola figury można
						uzyskać, mnożąc ten stosunek przez pole prostokąta, w którym zawarta
						jest figura.
					</p>
					<p class="mt-2 text-lg text-justify">
						Bardziej jaskrawym, a do tego jak najbardziej rzeczywistym przykładem
						zastosowania metody Monte Carlo jest analiza próbek medycznych i ocena
						stanu zdrowia pacjenta na ich podstawie. Proces pobierania próbki (np.
						krwi) jest obciążony fizycznymi (i prawnymi) ograniczeniami, a ponadto
						nie jest możliwe zebranie pełnego zestawu punktów pomiarowych
						(ewentualnie pośmiertnie). Jednakoż na podstawie małej próbki możliwe
						jest określenie stanu zdrowia pacjenta z rozsądną dokładnością.
					</p>
					<p class="mt-2 text-lg text-justify text-blue-600">
						<a href="/calculate-aera">Pokaż demo</a>
					</p>
				</li>
			</ol>
		</article>
	);
}
