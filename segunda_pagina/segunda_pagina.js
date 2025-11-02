
        window.addEventListener('load', function() {
            const loadingScreen = document.getElementById('loadingScreen');           //  Animação //
            const magicParticles = document.getElementById('magicParticles');
            
            
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';               
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 3 + 's';
                magicParticles.appendChild(particle);
            }
            
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 2500);
        });

        
        const backgroundMusic = document.getElementById('backgroundMusic');
        const muteBtn = document.getElementById('muteBtn');
        let isMuted = true;

        muteBtn.addEventListener('click', function() {
            isMuted = !isMuted;
            if (isMuted) {
                backgroundMusic.pause();
                muteBtn.textContent = '🔇 Música';
            } else {
                backgroundMusic.play().catch(e => {
                    console.log('Interação do usuário necessária para reproduzir áudio');
                });
                muteBtn.textContent = '🔊 Música';
            }
        });

        
        const podcasts = [
            {
                title: 'Episódio 1: Os Fundamentos de HTML',
                duration: '15 minutos',
                description: 'Descubra como HTML estrutura o mundo mágico da web, desde tags básicas até elementos semânticos avançados.'
            },
            {
                title: 'Episódio 2: CSS e a Arte da Estilização',
                duration: '18 minutos',
                description: 'Aprenda a transfigurar páginas simples em obras de arte com CSS, incluindo Flexbox, Grid e animações.'
            },
            {
                title: 'Episódio 3: JavaScript: Dando Vida às Páginas',
                duration: '22 minutos',
                description: 'Descubra o poder da interatividade com JavaScript, desde manipulação do DOM até eventos e funções mágicas.'
            },
            {
                title: 'Episódio 4: Responsividade: Magia para Todos os Dispositivos',
                duration: '20 minutos',
                description: 'Aprenda a criar feitiços que funcionam perfeitamente em varinhas... digo, dispositivos de todos os tamanhos!'
            }
        ];

        let currentPodcast = 0;
        let isPlaying = false;

        window.togglePlayPause = function() {
            isPlaying = !isPlaying;
            const btn = document.getElementById('playPauseBtn');
            btn.textContent = isPlaying ? '⏸️ Pause' : '▶️ Play';
        };

        window.nextPodcast = function() {
            currentPodcast = (currentPodcast + 1) % podcasts.length;
            updatePodcast();
        };

        window.previousPodcast = function() {
            currentPodcast = (currentPodcast - 1 + podcasts.length) % podcasts.length;
            updatePodcast();
        };

        function updatePodcast() {
            const podcast = podcasts[currentPodcast];
            document.getElementById('podcastTitle').textContent = podcast.title;
            document.getElementById('podcastInfo').textContent = 'Duração: ' + podcast.duration;
            document.getElementById('podcastDescription').textContent = podcast.description;
            isPlaying = false;
            document.getElementById('playPauseBtn').textContent = '▶️ Play';
        }

        
        window.scrollToSection = function(sectionId) {
            const element = document.getElementById(sectionId);
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

    
        window.goToSlytherin = function() {
            alert('A página da Sonserina está sendo preparada... A ambição aguarda! 🐍⚡');
        };

        
        document.addEventListener('mousemove', function(e) {
            if (Math.random() > 0.95) {
                const spark = document.createElement('div');        // Particulas do mouse //
                spark.style.position = 'fixed';
                spark.style.left = e.clientX + 'px';
                spark.style.top = e.clientY + 'px';
                spark.style.width = '4px';
                spark.style.height = '4px';
                spark.style.background = '#d3a625';
                spark.style.borderRadius = '50%';
                spark.style.pointerEvents = 'none';
                spark.style.zIndex = '9999';
                spark.style.opacity = '1';
                spark.style.transition = 'all 1s ease';
                document.body.appendChild(spark);
                
                setTimeout(() => {
                    spark.style.opacity = '0';
                    spark.style.transform = 'translateY(-50px)';
                }, 10);
                
                setTimeout(() => {
                    spark.remove();
                }, 1000);
            }
        });