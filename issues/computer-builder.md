
<!DOCTYPE html>
<html class=' dark-theme ' lang="en">
<head>
    <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Lesson - Computer Builder</title>

<meta name="description" content="RecursionはMITやスタンフォード大学を始めとする米国大学でよく用いられるコンピュータサイエンスのカリキュラムにインスパイアされて作られた教材です。コミュニティを活用することで効率的に独学で学習を進めることができます。">

<meta name="twitter:card" content="summary" /> <!--①-->
<!-- summary_large_image -->
<meta name="twitter:site" content="@recursioncs" /> <!--②-->

<meta property="og:url" content="https://recursionist.io" /> <!--③-->

<meta property="og:title" content="Recursion（リカージョン） | コンピュータサイエンスを基礎から学べるプラットフォーム" /> <!--④-->
<meta property="og:description" content="Recursionは「一人で何も作れない」を解決することに特化した、アメリカ発のプログラミング学習サービスです。" /> <!--⑤-->
<meta property="og:image" content="https://recursionist.io/img/front/social/share-main.jpg" />
<meta name="twitter:card" content="summary_large_image" />

<link rel="apple-touch-icon" href="/img/recursion-new-logo-white.png" sizes="180x180">
<link rel="icon" type="image/png" href="/img/recursion-logo-square.png">
    
    <!-- Bootstrap4 -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <!-- CSS -->

    <link rel="stylesheet" href="/css/dashboard/style.css?v=1.1.4">
    <link rel="stylesheet" href="/css/dashboard/style2.css?v=1.1.14">

    
            <link rel="stylesheet" href="/css/dashboard/darktheme.css?v=1.6">
    
    <link rel="stylesheet" href="https://recursionist.io/css/recursionAnime.css?v=1.2">

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900|Noto+Sans+JP:400,700,900&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link href="https://use.fontawesome.com/releases/v5.12.0/css/all.css" rel="stylesheet">

    <!-- Devicon -->
    <link rel="stylesheet" href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css">

    <!-- devicon -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/konpa/devicon@master/devicon.min.css">

    
    
    <link href="https://recursionist.io/js/toasty/toasty.min.css?v=10.1" rel="stylesheet">

    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css" integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8=" crossorigin="anonymous">
    <link href="https://recursionist.io/css/dashboard/search.css" rel=stylesheet />
            <link
        rel="stylesheet"
        href="https://recursionist.io/js/highlightjs-copy/dist/highlightjs-copy.css"
    />
    <style>
        .mermaid {
            width: 100%;
            visibility: hidden;
        }

        /* Default for small phones */
        .mermaid svg {
            width: auto;
            min-height: 50vh; /* Maximum height for smallest screens */
            max-height: 75vh;
        }

        /* Tablets and large phones */
        @media (min-width: 576px) {
            .mermaid svg {
                min-height: 45vh; /* Slightly smaller for larger phones and small tablets */
            }
        }

        /* Small desktops, tablets */
        @media (min-width: 768px) {
            .mermaid svg {
                min-height: 40vh; /* Medium height for tablets and desktops */
            }
        }

        /* Medium desktops and laptops */
        @media (min-width: 992px) {
            .mermaid svg {
                min-height: 35vh; /* Smaller height for laptops and medium desktops */
            }
        }

        /* Large desktops and TVs */
        @media (min-width: 1200px) {
            .mermaid svg {
                min-height: 30vh; /* Minimum height for large screens and TVs */
            }
        }
    </style>

    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-167085489-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-167085489-1');
</script>

<!-- Global site tag (gtag.js) - Google Ads: 10893176026 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-10893176026"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'AW-10893176026');
</script>
<!-- Global site tag (gtag.js) - Google Ads: 10893176026 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-10893176026"></script>
<script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-10893176026'); </script>

        
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/base16/rebecca.min.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link href="https://recursionist.io/css/dashboard/chat/style.css" rel=stylesheet />
</head>

<body class="">
<div id="main-page" class="page  dark-theme ">
    <nav id="topNav" class="bg-white dashboard-nav navbar navbar-expand-lg pt-1 navbar-light menu-padding">
    <a style='margin-right: 0.25rem;' class="navbar-brand" href="https://recursionist.io/dashboard">
        <img src="https://recursionist.io/img/dashboard/nav/recursion-logo-square.png" width="25" height="25" alt="">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto d-flex align-items-center flex-row">
            <li class="nav-item ">
                <a class="nav-link rem0p7 pr-2 pr-lg-2" href="https://recursionist.io/dashboard">ダッシュボード</a>
            </li>
            <li class="nav-item ">
                <a class="nav-link rem0p7 pr-2 pr-lg-2" href="https://recursionist.io/dashboard/courses">コース一覧</a>
            </li>
            <li class="nav-item">
                <a class="nav-link rem0p7 pr-2 pr-lg-2" href="https://recursionist.io/dashboard/problems">問題一覧</a>
            </li>
            <li class="nav-item">
                <a class="nav-link rem0p7 pr-2 pr-lg-2" href="https://recursionist.io/dashboard/team-dev">チーム開発</a>
            </li>

            <li class="nav-item">
                <a target='_blank' class="nav-link rem0p7 pr-2 pr-lg-2" href="https://blog.recursionist.io/">内定者の声</a>
            </li>

            <li class="nav-item">
                <a class="nav-link rem0p7 pr-2 pr-lg-2" href="https://recursionist.io/dashboard/community">コミュニティ</a>
            </li>

            <li class="nav-item">
                <a target='_blank' class="nav-link rem0p7 pr-2 pr-lg-1" href="https://support.recursionist.io/">ヘルプ</a>
            </li>
        </ul>

                <div class="aa-input-container mt-2 mb-0 col-md-3 col-sm-12" id="aa-input-container">
            <input type="search" id="aa-search-input" size=40 class="mb-2 pl-1 aa-input-search" placeholder="何かお探しですか？" name="search" autocomplete="off"/>
            <svg class="aa-input-icon" viewBox="654 -372 1664 1664" style="color:#090910;">
                <path d="M1806,332c0-123.3-43.8-228.8-131.5-316.5C1586.8-72.2,1481.3-116,1358-116s-228.8,43.8-316.5,131.5  C953.8,103.2,910,208.7,910,332s43.8,228.8,131.5,316.5C1129.2,736.2,1234.7,780,1358,780s228.8-43.8,316.5-131.5  C1762.2,560.8,1806,455.3,1806,332z M2318,1164c0,34.7-12.7,64.7-38,90s-55.3,38-90,38c-36,0-66-12.7-90-38l-343-342  c-119.3,82.7-252.3,124-399,124c-95.3,0-186.5-18.5-273.5-55.5s-162-87-225-150s-113-138-150-225S654,427.3,654,332  s18.5-186.5,55.5-273.5s87-162,150-225s138-113,225-150S1262.7-372,1358-372s186.5,18.5,273.5,55.5s162,87,225,150s113,138,150,225  S2062,236.7,2062,332c0,146.7-41.3,279.7-124,399l343,343C2305.7,1098.7,2318,1128.7,2318,1164z" />
            </svg>
        </div>
        
        <div class="nav-item dropdown mr-lg-0 pr-3">
            <a class="navbar-brand pl-2 pr-0 mr-lg-0 nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <img src="https://recursionist.io/img/avatars/animals-outline/13-elephant.png" class="avatar-sm auto-fit" style="padding : 0.1rem;" alt="">
                <i class="fas fa-sm fa-caret-down"></i>
            </a>
            <div class="dropdown-menu darkThemeDropDown">
                <a class="dropdown-item" href="https://recursionist.io/dashboard/problems/all/submissions">提出</a>
                <a class="dropdown-item" href="https://recursionist.io/dashboard/bookmarks/all">お気に入り</a>
                <a class="dropdown-item" href="https://recursionist.io/dashboard/roadmap">ロードマップ</a>
                <!-- <a class="dropdown-item" href="https://trello.com/b/Wlrk9aew" target="_blank">学習ロードマップ</a> -->
                <a class="dropdown-item" href="https://recursionist.io/dashboard/settings">設定</a>
                <div class="dropdown-divider"></div>
                <form id="logout-form" action="https://recursionist.io/logout" method="POST" style="display: none;">
                    <input type="hidden" name="_token" value="v7fBIouYPPV5s4BTh6lahhrrY2JyJ5SguQJbHmgk">                </form>
                <a class="dropdown-item" href="https://recursionist.io/logout" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                    ログアウト
                </a>
            </div>
        </div>
                    <a class="btn mr-1 d-md-block d-none paid-user-button" href="https://recursionist.io/dashboard">Premium</a>
            </div>
</nav>

    <div class="container-fluid home-navigation">
    </div>

    <div id="main-dashboard-content" class="dashboard-content bg-white">
                    <div class="bg-light p-relative col-12 d-flex flex-end px-0">
    <div id="contentsidebar" style='overflow: auto;height:100vh;' class="col-12 col-md-3 col-xl-2 px-0 transition-1 mw-0 mh-100">
        <div class="col-12 d-flex bg-white justify-content-between align-items-center px-0" style="min-height:2.0rem;">
            <a id="table-content" class="d-none m-0 rem0p8 ml-3 font-weight-bolder text-dark" href="https://recursionist.io/dashboard/course/18">目次に戻る</a>
            <p onclick="recursionHelper.mobileGoBackContent()" id="go-back-mobile" class="d-none m-0 rem0p8 mr-4 font-weight-bolder text-dark">コンテンツに戻る<i class="fas fa-caret-right ml-2" style="color: black;"></i></p>
        </div>
        <div class="col-12 m-0 p-0" id="lesson-sidenav">
            <div class="col-12 d-flex justify-content-center align-items-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            
        </div>
        <script>
            (function(){
                window.addEventListener("load", function(){
                    let sideNavFetch = jsTools.postCall("https://recursionist.io/dashboard/course/18/post/lesson/396/side-navigation", {"_token":"v7fBIouYPPV5s4BTh6lahhrrY2JyJ5SguQJbHmgk"});
                    sideNavFetch.then(data=>{
                        if(data.sidenav){
                            let parent = document.getElementById("lesson-sidenav");
                            parent.innerHTML = data.sidenav;
                            parent.querySelectorAll(".percentCircleDivs").forEach(element=>{
                                let percentCircle = element.getAttribute("data-percentcircle");
                                recursionHelper.percentCircle("#"+element.id,percentCircle);
                            })
                        }
                    }).catch(error=>{
                        console.log(error);
                    });

                }, false);
            }())
        </script>

    </div>

    <div id="content-size" class="col-12 px-0">
        <div class="sticky-top bg-r-dark text-white row col-12 py-3 py-md-2 py-lg-1 d-flex justify-content-between mx-0" style="z-index:99;">
            <div class="col-lg-2 pl-0 pl-md-1 col-md-11 col-12 px-0 d-flex justify-content-start align-items-center">
                <i title="Menu" class="fas fa-bars cursor-pointer" onclick="recursionHelper.sidenavAnimation()"></i>
                <i id="zoomPlus" title="Zoom In" class="fas fa-search-plus cursor-pointer pl-3 d-none d-lg-block" onclick="recursionHelper.contentZoomIn()"></i>
                <i id="zoomMinus" title="Zoom Out" class="fas fa-search-minus cursor-pointer pl-3 d-none" onclick="recursionHelper.contentZoomOut()"></i>
                <div class="row col-lg-6 col-md-12 col-12 text-center px-0">
                    <div class="col-6 text-left px-0">
                                                    <a class="m-0 rem0p8 text-white d-none" href="https://recursionist.io/dashboard/course/18/lesson/395"><i class="fas fa-angle-double-left mr-1"></i>前へ</a>
                                            </div>
                    <div class="col-6 text-right text-lg-left px-0">
                                            </div>
                </div>
            </div>
            <div class="p-relative col-lg-3 col-md-6 px-0 d-none d-lg-block" style="padding-top:0.1rem;">
                <i class="fas fa-angle-down fa-fw arrow-down-tutorial text-dark d-none"></i>
                    <select class="selectplan py-0 custom-select" id="languageSelectMain" style="border: 1px solid black; font-size:0.75rem;height:1.5rem;" onchange="recursionHelper.changeDefaultLanguage(this, `v7fBIouYPPV5s4BTh6lahhrrY2JyJ5SguQJbHmgk`, `https://recursionist.io/user/api/settings/language`)">
                                                                            <option value="cpp" >C++ (GCC 9.2.0)</option>                                                    <option value="java" >Java (OpenJDK 13.0.1)</option>                                                    <option value="js" >JavaScript (Node.js 12.14.0)</option>                                                    <option value="php" selected>PHP (7.4.1)</option>                                                    <option value="python" >Python (3.8.1)</option>                                                    <option value="custom" >Practice (i.e Typescript)</option>                                            </select>
            </div>

            <div class="col-lg-2 col-md-1 col-5 px-0 d-flex justify-content-end align-items-center mx-0">
                <div class="mr-0 mr-md-1">
                                            <div class="cursor-pointer" onclick="document.getElementById('bookmark-add').submit();">
                            <i title="favorite" class="fas fa-bookmark text-dark-light list-unstyled d-none d-md-block" style="vertical-align: -.15em;"></i>
                            <form id="bookmark-add" action="https://recursionist.io/dashboard/bookmark/post/396/add" method="post"><input type="hidden" name="_token" value="v7fBIouYPPV5s4BTh6lahhrrY2JyJ5SguQJbHmgk"></form>
                        </div>
                                    </div>
            </div>
        </div>


        <div class="bg-light row col-12 d-flex justify-content-center mx-0 overflow-auto px-2">

            <div id="contentwidth" class="recursion-content pt-1 content-width transition-2">
                <div class="col-12 d-none">
                    <h2><i class="fas fa-book fa-fw mr-1 list-purple fa-sm"></i>Computer Builder</h2>
                </div>
                <div class="bg-white rounded px-lg-4 px-3 px-md-3 mb-1 mt-2 pt-2 pb-4 shadow">
                        <div class="">
                            <h1 class="m-0"><i class="fas fa-book list-tutorial fa-fw mr-1 "></i>Computer Builder</h1>
                            <hr class="mt-2">
                        </div>
                                                    <div markdown="1">

<p>今からコンピュータを「作る」アプリケーションを作成するプロジェクトに取り組みます。ここでの「作る」とは、実際に物理的なパーツを組み立てるのではなく、異なるパーツを選択し、それらがどのような性能を持つコンピュータを作り出すかをシミュレートするという意味です。</p>

<br>

<p>コンピュータは、主に以下のような部分から成り立っています。</p>

<ul>
    <li>CPU（中央処理装置）</li>
    <li>GPU（グラフィックス処理装置）</li>
    <li>メモリ（RAM）</li>
    <li>ストレージ（HDD または SSD）</li>
</ul>

<p>あなたのタスクは、これらのパーツを選んで「仮想のコンピュータ」を組み立て、その性能を評価し比較するアプリケーションを作成することです。</p>

<br>

<p>ここで役立つのが、各パーツの種類についてのデータが提供されているサイトです。<a target='_blank' href='https://api.recursionist.io/builder/computers'>https://api.recursionist.io/builder/computers</a> というアドレスで、この URL に特定のリクエスト（ここでは GET リクエスト）を送ることで、サーバからコンピュータのパーツに関する上位 100 製品のリストを受け取ることができます。</p>

<br>

<p><a target='_blank' href='https://api.recursionist.io/builder/computers?type=gpu'>https://api.recursionist.io/builder/computers?type=gpu</a> というように、URL の後ろに <span class='command-line'>?type=gpu</span> のようなパラメータを追加すると、GPU に関するデータだけをリクエストすることができます。このように、エンドポイントとパラメータを組み合わせることで、必要な情報だけを効率的に取得することが可能になります。今回のプロジェクトでは、<span class='command-line'>cpu</span>、<span class='command-line'>gpu</span>、<span class='command-line'>ram</span>、<span class='command-line'>hdd</span>、<span class='command-line'>ssd</span> のデータを取得することができます。</p>

<br>

<p>このアプリケーションでは、ユーザーが多数のコンピュータを組み立てられ、その性能をゲーミングまたは作業用という基準で評価できるようにします。選べる部品は、ブランドやモデルごとに分かれています。また、RAM やストレージの詳細な情報は、各部品のモデル名から取得します。</p>

<br>

<p>メモリーカード（<a target='_blank' href='https://api.recursionist.io/builder/computers?type=ram'>https://api.recursionist.io/builder/computers?type=ram</a>）の場合、モデル名には、メモリースロットがいくつあるのか、それぞれの大きさはどれくらいか、といった情報も含まれています。その情報をモデル名から引き出す必要があります。例えば、モデル名が「Ballistix Elite DDR4 3600 C16 4x8GB」であれば、メモリスロットが 4 つあり、それぞれに 8GB のメモリが搭載されているということです。ストレージについても、SSD か HDD かを選択可能で、モデル名の最後にはデータ容量が記載されています。</p>

<br>

<p>ユーザーがすべてのパーツを選んだら、プログラムは構築した仮想コンピュータのスコアを計算します。スコアは各パーツの性能に基づいており、ゲーム用か仕事用かによって重みが異なります。これらのスコアは、ゲーミングまたは作業用の基準に従って、GPU、CPU、RAM、ストレージの性能に重み付けされます。例えば、ゲーミング用の基準では、GPU 性能が 60%、CPU 性能が 25%、RAM が 12.5%、ストレージが 2.5% となります。作業用コンピュータは、CPU 性能 60%、GPU 性能 25%、RAM 10%、ストレージ 5% を基準としています。</p>

<br>

<p>各パーツのスコア（Benchmark）は0～100が基本ですが、そのパーツが特別に優れている場合は 100 を超えることもあります。特に SSD のベンチマークスコアは最大 400% まで上がるので、最終的なスコアに上記の重みよりも大きな影響を与える可能性があります。</p>

<br>

<p>それでは以下のエディタで、Computer Builder を実装してみましょう。</p>

<div class="d-flex justify-content-center">
    <img src="/img/dashboard/lessons/projects/prompt-4.png" alt="" class="col-lg-12 desktop-image col-12 h-100 px-0 py-2">
</div>


<div id="htmlRunner1" data-language="html" class="my-4 html-run">
    <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                    <a class="nav-link cursor-pointer language-switcher active" data-language="html">HTML</a>
                </li>
                                        <li class="nav-item">
                    <a class="nav-link cursor-pointer language-switcher " data-language="css">CSS</a>
                </li>
                                        <li class="nav-item">
                    <a class="nav-link cursor-pointer language-switcher " data-language="javascript">JavaScript </a>
                </li>
                    </ul>
        <ul class="navbar-nav mr-4">
                        <li class="nav-item ml-auto pr-1">
                <button title="一度保存ボタンを押すとtwitterでシェアすることができます。" class="btn share-btn" style="background:#3AA1F2;" disabled onclick="window.open(`http://twitter.com/share?url=` + `https://recursionist.io/share/arihori/lessoncode/396/htmlRunner1` + `&hashtags=RecursionCS,プログラミング学習,コンピュータサイエンス`)" target="_blank"><i class="fab fa-twitter" style="color:white;"></i></button>
            </li>
            <li class="nav-item ml-auto pr-1">
                <button title="一度保存ボタンを押すとrecursion内に公開することができます。" class="btn r-share-btn text-white bg-secondary " disabled onclick="recursionHelper.makePublicGenericHandler('https://recursionist.io/dashboard/settings/sharable/lesson/code',{'_token':'v7fBIouYPPV5s4BTh6lahhrrY2JyJ5SguQJbHmgk','lesson_id':396, 'element_id':'htmlRunner1'},this);"><i class="fas fa-globe-asia"></i></button>
            </li>
                        <li class="nav-item ml-auto pr-1">
                <button title="リセット" class="btn btn-outline-secondary reset-btn"><i class="fas fa-redo-alt"></i></button>
            </li>
            <li class="nav-item ml-auto pr-1">
                <div class="dropdown">
                    <button title="履歴" class="btn btn-outline-secondary history-btn" type="button" id="dropdownHistoryhtmlRunner1" data-boundary="scroll" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-history"></i>
                    </button>
                    <div class="dropdown-menu user-codes-dropdown" aria-labelledby="dropdownHistoryhtmlRunner1">
                                                    まだ履歴がありません
                                            </div>
                </div>
            </li>
            <li class="nav-item ml-auto pr-1">
                <button title="保存" class="btn btn-outline-secondary save-btn"><i class="far fa-save"></i></button>
            </li>
            <li class="nav-item ml-auto expand-btn pr-1">
                <button title="全画面" class="btn btn-outline-secondary" onclick="recursionHelper.fullScreenHtmlRunner(`htmlRunner1`);recursionHelper.fullScreenResizeEvent(`htmlRunner1`);window.dispatchEvent(new Event('resize'));"><i class="fas fa-expand"></i></button>
            </li>
            <li class="nav-item ml-auto d-none shrink-btn pr-1">
                <button title="全画面" class="btn btn-outline-secondary" onclick="recursionHelper.windowedHtmlRunner(`htmlRunner1`);window.dispatchEvent(new Event('resize'));this.click();this.click();"><i class="fas fa-compress-arrows-alt"></i></button>
            </li>
            <li class="nav-item ml-auto">
                <button title="実行" style="white-space:nowrap;" class="btn btn-outline-secondary run-code">実行 <i class="fas fa-play"></i></button>
            </li>
        </ul>
    </nav>

    <div class="runner">
        <div class="d-flex justify-content-start workbench resizable">
            <div class="left h-100 cw-50">
                <div class="target-html h-100" class="p-3">
                    <div id="htmlRunner1editor" class="main-code col-12 px-0 h-100">
                    </div>
                </div>
            </div>
            <div class="resizeH"></div>
            <div class="bg-white p-0 right frame">
                <div class="col-12 h-100 p-0">
                    <div class="col-12 p-0 ch-100 top-frame">
                        <div class="windowfor">Result <span class="widthtag"></span></div>
                        <div class="frame-box h-100 col-12 p-0">
                        </div>
                    </div>
                                        <div class="frame-box col-12 p-0 bottom-frame">
                        <div class="m-0 text-white bg-secondary d-flex justify-content-between console-nav border border-dark shadow">
                            <div class="d-flex">
                                                                <button class="text-right user-frame-console-btn btn btn-dark active" disabled>
                                    <span style="white-space:nowrap;">
                                        <i class="fas fa-terminal"></i> コンソール
                                    </span>
                                </button>
                                                                                                <button style="white-space:nowrap;" class="text-right preview-frame-viewer-btn btn btn-dark  " >
                                    <span style="white-space:nowrap;">
                                        <i class="fas fa-eye"></i>見本
                                        <a href="/private/general/html/project4/computer-builder.html" target="_blank" class="pl-2 text-white coderun-preview-link"><i class="fas fa-external-link-alt"></i></a>
                                    </span>
                                </button>
                                                            </div>
                        </div>
                        <div class="console-contents">
                            <div class="h-100 user-frame-console col-12 p-0 " style="white-space: pre-line;overflow-wrap: break-word;">
                            </div>
                                                            <iframe src="/private/general/html/project4/computer-builder.html" frameborder="0" class="preview-frame-viewer  d-none "></iframe>
                                                    </div>
                    </div>
                                    </div>
            </div>
        </div>
    </div>
</div>


</div>

                                                                    </div>
                <div class="d-flex pt-2 pb-3 justify-content-center">
                    <div class="col-6 text-left px-0">
                                                <a class="text-white rem0p8 btn primary-btn" href="https://recursionist.io/dashboard/course/18/lesson/395"><i class="fas fa-angle-double-left mr-1"></i>前へ</a>
                                            </div>
                    <div class="col-6 text-right px-0">
                                                    <button class="text-white rem0p8 btn primary-btn "  onclick="recursionHelper.congratsFinishPop('Library App|Library Applicationをクリアできました！', 'https://recursionist.io/info/course/18', 'https://recursionist.io/dashboard')" >終了</button>
                                            </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>

        <div></div>
</div>

<script src="https://recursionist.io/js/jquery/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


<script src="https://recursionist.io/js/progressbar/progressbar.js"></script>
<script src="https://recursionist.io/js/sweetalert2/sweetalert2.all.min.js?v=10.1"></script>
<script src="https://recursionist.io/js/toasty/toasty.min.js"></script>
<script type="module" src="https://recursionist.io/js/animations/animejs/anime.es.js"></script>


<script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch-lite.umd.js" integrity="sha256-EXPXz4W6pQgfYY3yTpnDa3OH8/EPn16ciVsPQ/ypsjk=" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js" integrity="sha256-LAGhRRdtVoD6RLo2qDQsU2mp+XVSciKRC8XPOBWmofM=" crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/algoliasearch@3/dist/algoliasearchLite.min.js"></script>
<script src="https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"></script>


    <script src="https://recursionist.io/js/algSearchRecursion_v1.1.js"></script>


<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://recursionist.io/js/recursionChat.js?v1.03"></script>
<script>recursionChat.start('#main-dashboard-content', {csrf: 'v7fBIouYPPV5s4BTh6lahhrrY2JyJ5SguQJbHmgk', url: 'https://recursionist.io/dashboard/api/ai/chat'}, {maxTextareaLength: 3000, premiumMember: true});</script>
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>



<script>window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));</script>


<script type="text/javascript">
    $(function() {
        // this will get the full URL at the address bar
        let url = new URL(window.location.href);

        // passes on every "a" tag
        $(".dashboard-nav a").each(function() {
            // checks if its the same on the address bar
            if (this.href === url.origin + url.pathname) {
                $(this).closest("li").addClass("active");
            }
        });
    });
</script>

            
    <script>
        function percentCircle(idString,percent){
            var bar = new ProgressBar.Circle(idString, {
                strokeWidth: 6,
                easing: 'easeInOut',
                duration: 1400,
                color: '#ADDEC9',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: null
            });

            bar.animate(percent/100);  // Number from 0.0 to 1.0
        }
    </script>
    <script defer type="module" src="https://recursionist.io/js/editor/monaco-language-client/client/main.js?v1.51"></script>


<script>
    const defaultTheme = false;
    window.recursionConfig = {
        isDefault: defaultTheme,
        monacoTheme: defaultTheme ? "vs" : "vs-dark",
        sweetAlertBg:  defaultTheme ? "#fff" : "#0D1117",
        sweetAlertText: defaultTheme ? "#000" : "#C9D1D8",
    };
</script>

<script src="https://recursionist.io/js/coderunner_v1.46.js?v1.58"></script>
<script src="https://recursionist.io/js/recursionAlerts.js?v1.41"></script>
<script src="https://recursionist.io/js/recursionHelper_v1.2.js?v1.41"></script>
<script src="https://recursionist.io/js/jsTools.js"></script>
<script type="module" src="https://recursionist.io/js/recursionAnime.js"></script>
<script src="https://recursionist.io/js/recursionExampleFunctions_v1.2.js?v1.11"></script>

            <script>
        
        window.addEventListener('load', function() {
            let zoominCache = localStorage['recursion_zoomIn'] || "false";
            if(zoominCache === "true"){
                //zoomin if cache
                let doc = document.getElementById("zoomPlus").click();
                if(doc) doc.click();
            }

            //hamburger listener, close accordions.
            const mobileHam = document.getElementById("go-back-mobile")
            mobileHam.addEventListener("click",function(event){ try{document.querySelectorAll(".sticky-top .accordion .card-header:not(.collapsed)").forEach(function(ele){ele.click()})}catch(e){console.log(e.message)}})
        });
        </script>

    <script src="https://cdn.jsdelivr.net/npm/spin.js@2.3.2/spin.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"></script>
    <script src="https://recursionist.io/js/highlightjs-copy/dist/index.js"></script>

    <script>
        const spinnerOptions = {
            lines: 12,
            length: 7,
            width: 5,
            radius: 10,
            scale: 1,
            corners: 1,
            color: '#000',
            fadeColor: 'transparent',
            opacity: 0.25,
            rotate: 0,
            direction: 1,
            speed: 1,
            trail: 60,
            fps: 20,
            zIndex: 2e9,
            className: 'spinner',
            top: '50%',
            left: '50%',
            shadow: 'none',
            position: 'absolute',
        };

        // Initialize spinners on all .mermaid <pre> tags
        function initializeSpinners() {
            const mermaidElements = document.querySelectorAll('.mermaid');

            mermaidElements.forEach((element) => {
                const parent = element.parentNode;
                const spinner = new Spinner(spinnerOptions).spin(parent);
                element.spinnerInstance = spinner;
            });
        }

        // Start spinners on all .mermaid tags as soon as the DOM is ready
        document.addEventListener("DOMContentLoaded", function() {
            initializeSpinners(); // Ensure spinners are initialized immediately on .mermaid tags
            hljs.addPlugin(
                new CopyButtonPlugin({
                    autohide: false,
                })
            );
        });
    </script>

    <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

        // Function to apply pan and zoom after checking valid dimensions
        function applyPanZoom(diagram) {
            if (diagram) {
                // Apply custom width and maxWidth styles
                diagram.style.width = "100%";
                diagram.style.maxWidth = "100%";

                try {
                    const bbox = diagram.getBBox();

                    if (bbox.width > 0 && bbox.height > 0) {
                        const viewBox = diagram.viewBox.baseVal;
                        if (!viewBox) {
                            console.error("SVG does not have a viewBox attribute.");
                            return;
                        }

                        const svgWidth = viewBox.width;
                        const svgHeight = viewBox.height;

                        diagram.style.height = viewBox.height;

                        const container = diagram.parentNode;
                        const desiredWidth = container.clientWidth;
                        const desiredHeight = window.innerHeight;

                        console.log(container)
                        console.log(desiredHeight)

                        const isWidthExceed = svgWidth > desiredWidth;
                        const isHeightExceed = svgHeight > desiredHeight;

                        let initialZoom = 1;

                        if (isWidthExceed || isHeightExceed) {
                            const scaleX = svgWidth / desiredWidth;
                            const scaleY = svgHeight / desiredHeight;

                            const scale = Math.max(scaleX, scaleY);
                            initialZoom = Math.min(Math.max(scale, 1), 10);
                        }

                        // Initialize svgPanZoom
                        const panZoomInstance = svgPanZoom(diagram, {
                            zoomEnabled: true,
                            controlIconsEnabled: true,
                            fit: false,
                            center: false,
                            minZoom: 0.5,
                            maxZoom: 10,
                            customEventsHandler: {
                                init: function(svgElementObject) {
                                    let svgInstance = svgElementObject.instance
                                    let svgElement = svgElementObject.svgElement
                                    console.log(svgInstance.getSizes().width)
                                    svgInstance.zoomAtPoint(initialZoom, {x: svgInstance.getSizes().width / 2, y: 0})
                                }
                            }
                        });
                    } else {
                        console.error("SVG has invalid dimensions, skipping pan and zoom.");
                    }
                } catch (e) {
                    console.error("Error applying pan and zoom:", e);
                }
            }
        }

        // Function to initialize Mermaid diagrams and apply pan and zoom
        function initMermaid() {
            const mermaidElements = document.querySelectorAll('.mermaid');

            // Initialize Mermaid diagrams
            mermaid.init(undefined, mermaidElements);

            // After initialization, apply pan and zoom for each diagram
            mermaidElements.forEach((element) => {
                const target = element.parentNode;

                const observer = new MutationObserver(() => {
                    const diagram = element.querySelector('svg');
                    if (diagram) {
                        // Delay to ensure the diagram is fully rendered
                        setTimeout(() => {
                            applyPanZoom(diagram);

                            element.spinnerInstance.stop();
                            element.style.visibility = 'visible';

                            observer.disconnect();
                        }, 100);
                    }
                });

                // Start observing for changes in the element (when the SVG is inserted)
                observer.observe(element, { childList: true });
            });
        }

        document.addEventListener("DOMContentLoaded", function() {
            initMermaid();
        });

        // Mermaid configuration
        mermaid.initialize({
            startOnLoad: true,
            securityLevel: 'loose',
        });
    </script>
    <script>
        (function(){
            /*<!--*/
            let htmlCode = "";
            let cssCode = "";
            let jsCode = "";
            let userHtmlCode = "";
            let userCssCode = "";
            let userJsCode = "";
                        try{
                htmlCode = codeRunner.decodeEntities(`&lt;!--bootstrap--&gt;
&lt;link rel=\&quot;stylesheet\&quot; href=\&quot;https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css\&quot; integrity=\&quot;sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk\&quot; crossorigin=\&quot;anonymous\&quot;&gt;

&lt;!-- ここからHTMLを記述してください。 --&gt;`);
                cssCode = codeRunner.decodeEntities(`/* ここからCSSを記述してください。 */`);
                jsCode = codeRunner.decodeEntities(`// ここからJavaScriptを記述してください。`);
                userHtmlCode = codeRunner.decodeEntities(``);
                userCssCode = codeRunner.decodeEntities(``);
                userJsCode = codeRunner.decodeEntities(``);
            }
            catch(err){
               console.log(err);
            }

            let languageOriginals = {
                html:htmlCode,
                css:cssCode,
                javascript:jsCode,
            };

            //deep copy the original
            let languageCodes = $.extend(true, {}, languageOriginals);
            if(userHtmlCode) languageCodes.html = userHtmlCode;
            if(userCssCode) languageCodes.css = userCssCode;
            if(userJsCode) languageCodes.javascript = userJsCode;
            /*-->*/

            //set prevLanguage as the initial
            let prevLanguage = $(`#htmlRunner1`).data('language');
            let prevCodePositionLanguages = {};

            let selectedLanguage = prevLanguage ? [prevLanguage,languageCodes[prevLanguage]] : Object.entries(languageCodes).filter(function(entry){return entry[1] ? true : false})[0];
            //on init, timers are also enabled for this snippet.
            let loadCallback = function(){
                codeRunner.autoClickTimer('monaco'+`htmlRunner1editor`, document.querySelectorAll(`#htmlRunner1 .save-btn`).item(0), recursionHelper.minsToMs(10))
            }

            if(selectedLanguage[1]) codeRunner.initMonaco(`htmlRunner1editor`, selectedLanguage[0], selectedLanguage[1], loadCallback)


            $(`#htmlRunner1 .language-switcher`).on('click',function(){
                let selectedLanguage = [$(this).data('language'),languageCodes[$(this).data('language')]]
                if(selectedLanguage[1] && prevLanguage){
                    //update the previous language's content, and update the previous language
                    languageCodes[prevLanguage] = codeRunner.getEditorValue(`htmlRunner1editor`)

                    //position of the editor
                    prevCodePositionLanguages[prevLanguage] = codeRunner.getEditorLine(`htmlRunner1editor`)
                    let codePosition = prevCodePositionLanguages[selectedLanguage[0]] ? prevCodePositionLanguages[selectedLanguage[0]] : null;

                    prevLanguage = $(this).data('language')

                    let result = codeRunner.updateMonacoLanguage(`htmlRunner1editor`, selectedLanguage[0], selectedLanguage[1], codePosition, loadCallback)
                    if(result){
                        //remove actives
                        $(`#htmlRunner1 .language-switcher`).removeClass('active')
                        $(this).addClass('active')
                    }
                }
            });

            $(`#htmlRunner1 .run-code`).on('click',function(){
                let selectedLanguage = [$(`#htmlRunner1 .language-switcher.active`).first().data('language'),'']
                codeRunner.htmlMonacoRun(`htmlRunner1editor`,document.querySelectorAll(`#htmlRunner1 .frame .frame-box`).item(0), selectedLanguage[0], languageCodes.html, languageCodes.css, languageCodes.javascript, document.querySelectorAll(`#htmlRunner1 .user-frame-console`).item(0), false)
            })

            $(`#htmlRunner1 .reset-btn`).on('click',function(){
                recursionAlerts.fireResetAlert().then((result) => {
                    if (result.value) {
                        const currentElement = $(`#htmlRunner1 .language-switcher.active`).first()
                        const currentSelectedLanguage = currentElement.data('language')
                        languageCodes[currentSelectedLanguage] = languageOriginals[currentSelectedLanguage]
                        currentElement.click()
                    }
                })
            });

            //save code
            $(`#htmlRunner1 .save-btn`).on('click',function(){
                //update the contents of the current selected language
                const currentSelectedLanguage = $(`#htmlRunner1 .language-switcher.active`).first().data('language')
                languageCodes[currentSelectedLanguage] = codeRunner.getEditorValue(`htmlRunner1editor`)

                let toast = new Toasty({insertBefore: false, duration:1000, transition: "slideDownUpFade"});
                //save each language
                Object.keys(languageCodes).map(function(language){
                    //save if there is code
                    if(languageCodes[language]) recursionHelper.saveUserLessonCode(languageCodes[language],language,`htmlRunner1`,`v7fBIouYPPV5s4BTh6lahhrrY2JyJ5SguQJbHmgk`,`https://recursionist.io/dashboard/course/post/lesson/396/web/code/save`, function(resp){
                        let shareBtn = document.querySelectorAll(`#htmlRunner1 .share-btn`).item(0)
                        let rShareBtn = document.querySelectorAll(`#htmlRunner1 .r-share-btn`).item(0)
                        if(shareBtn) shareBtn.disabled = false;
                        if(rShareBtn) rShareBtn.disabled = false;
                        // console.log(resp)
                        //only toast on first key
                        if(language === currentSelectedLanguage) toast.success("コードが保存されました");
                        if(resp.user_codes_html){
                            //get the dom were to append it
                            let targetDropdown = document.querySelectorAll(`#htmlRunner1 .dropdown-menu`).item(0)
                            if(targetDropdown) targetDropdown.innerHTML = resp.user_codes_html;
                        }
                    }, function(resp){
                        console.log(resp)
                        if(language === currentSelectedLanguage) toast.error("コード保存に失敗しました。");
                    });
                })
            })

                            //attach console button
                function setupConsoleNav(){
                    const userConsoleDiv = document.querySelectorAll("#htmlRunner1 .user-frame-console").item(0)
                    const userConsoleBtn = document.querySelectorAll("#htmlRunner1 .user-frame-console-btn").item(0)
                    const previewDiv = document.querySelectorAll("#htmlRunner1 .preview-frame-viewer").item(0)
                    const previewBtn = document.querySelectorAll("#htmlRunner1 .preview-frame-viewer-btn").item(0)

                    if(!(userConsoleDiv && previewDiv)) return false;

                    const toggleSwitch = function(e){
                        userConsoleDiv.classList.toggle("d-none")
                        userConsoleBtn.classList.toggle("active")
                        previewDiv.classList.toggle("d-none")
                        previewBtn.classList.toggle("active")
                        userConsoleBtn.toggleAttribute("disabled");
                        previewBtn.toggleAttribute("disabled");
                    };

                    previewBtn.addEventListener("click", toggleSwitch)
                    userConsoleBtn.addEventListener("click", toggleSwitch)

                    return true
                }
                setupConsoleNav()
            
            //begin dragable code
            const parentBox = document.getElementById("htmlRunner1").parentElement;


            function dragabbleSetup(){
                

                //vertical shift
                const mainContainerVertical = document.querySelectorAll("#htmlRunner1 .workbench").item(0);
                const consoleNav = document.querySelectorAll("#htmlRunner1 .console-nav").item(0);
                const middleBar = document.querySelectorAll("#htmlRunner1 .resizeH").item(0);
                const topDrag = document.querySelectorAll("#htmlRunner1 .top-frame").item(0);
                const bottomDrag = document.querySelectorAll("#htmlRunner1 .console-contents").item(0);
                const leftDrag = document.querySelectorAll("#htmlRunner1 .left").item(0);
                

                codeRunner.htmlHelper.resizeableHorizontal(mainContainerVertical, middleBar,leftDrag, 'monaco'+`htmlRunner1editor`);

                if(consoleNav){
                    console.log("DRAGGGS")
                    codeRunner.htmlHelper.heightAdjust(mainContainerVertical, topDrag, consoleNav, 0.8);
                    codeRunner.htmlHelper.resizeableVertical(mainContainerVertical, consoleNav,topDrag, bottomDrag, 'monaco'+`htmlRunner1editor`);
                    //trigger resize
                    consoleNav.dispatchEvent(new Event("mousedown"));
                    mainContainerVertical.dispatchEvent(new Event("mousemove"));
                    window.dispatchEvent(new Event("mouseup"));

                    window.addEventListener("fullScreenRunnerHtml", function(){
                        codeRunner.htmlHelper.heightAdjust(mainContainerVertical, topDrag, consoleNav, 0.5);
                        consoleNav.dispatchEvent(new Event("mousedown"));
                        mainContainerVertical.dispatchEvent(new Event("mousemove"));
                        window.dispatchEvent(new Event("mouseup"));
                    })
                }

                

                let editorId = `htmlRunner1editor`
                let monacoEditorId = 'monaco'+`htmlRunner1editor`
                $('#' + editorId).on('click',function(e){
                    if(window[monacoEditorId] && window[monacoEditorId].editor){
                        window[monacoEditorId].editor.focus()
                    }
                })
            }

            let mutationSym = 0;

            if(parentBox.classList.contains('collapse-box')){
                try {
                    const classChange = function(mutationsList, observer) {
                        observer.disconnect();
                        if(mutationSym < 1) dragabbleSetup();
                    };

                    const observer = new MutationObserver(classChange);
                    observer.observe(parentBox, {attributes: true});
                }
                catch{
                    console.log("Mismatched Mutation")
                }
            }
            else{
                dragabbleSetup()
            }

        }())
    </script>
<script>
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
</script>

<script>
    </script>



</body>
</html>
