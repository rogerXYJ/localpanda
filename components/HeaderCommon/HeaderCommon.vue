<template>
	<div id="header">
		<div class="heder-cont clearfix">
			<div class="headleft">
				<div class="log">
					<a href="/">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-logo1"></use>
						</svg>
					</a>
	
				</div>
				<div class="search" @click.stop="showSearch">
					<i class="iconfont">&#xe67a;</i>
					<span>Attraction, Activity, Destination</span>
				</div>
			</div>
			<ul class="init" v-if="isAnonymity">

			</ul>
			<ul class="init" v-if="(logIn==0||logIn==null)&&!isAnonymity">
				<li class="selectCurrency">
					<label @click="showSelectCurreney" class="selectCurrencyBtn">{{currency}} ( {{symbol}} ) <span class="iconfont">&#xe666;</span> </label>
					<div class="currencyBox" v-if="showCurrency">
						<div class="currencyItem" :class="{color:item.sure}"  v-for="(item,index) in exchange" @click.stop="setCurrency(item,index)">	
										
							<svg v-if="index==1" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false">
								<path d="m0 0h32v24h-32z" fill="#de2910">
								</path>
								<path d="m6 7.5-2.1 1.4.8-2.45-2.1-1.55h2.6l.8-2.5.8 2.5h2.6l-2.1 1.55.8 2.45zm5.79-4.59-.92.19.64-.75-.48-.85.88.37.65-.77-.11 1 .88.37-.94.25-.1.98zm2.86 2.38-.46.82-.15-.98-.96-.2.86-.42-.16-.99.69.74.86-.42-.43.87.68.72zm-.24 3.67-.75.57.26-.95-.79-.57.96-.03.26-.97.33.95.96-.03-.75.62.33.93-.79-.51zm-2.63 2.37-.91.23.61-.77-.51-.83.89.34.62-.79-.07 1 .89.34-.93.28-.06.99z" fill="#ffde00">
								</path>
							</svg>
							<svg v-if="index==0" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false" ><path d="m0 0h32v24h-32z" fill="#fff"></path><path d="m0-.25h32v1.85h-32zm-.09 3.85h32v1.85h-32v-1.85zm.13 3.94h32v1.85h-32v-1.85zm-.03 3.62h32v1.85h-32zm0 3.44h32v1.85h-32zm0 3.9h32v1.85h-32zm0 4h32v1.85h-32z" fill="#de2110"></path><path d="m0 0h18v13h-18z" fill="#0334ab"></path><path d="m1.31.61.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51z" fill="#fff"></path></svg>			
							<svg v-if="index==2" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false"><path d="m0 0h32v24h-32z" fill="#039"></path><path d="m16 5.56-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm3.56.98-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm2.6 2.59-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm.96 3.55-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-.97 3.57-.77.54.29-.94-.77-.6h.96l.29-.96.3.96h.96l-.77.6.29.94-.77-.54zm-2.59 2.61-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-3.56.93-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-3.56-.95-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-2.6-2.62-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-.95-3.53-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm.95-3.56-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm2.61-2.63-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94z" fill="#fc0"></path></svg>	
							<svg v-if="index==3" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false"><path d="m .02 0h32v24h-32z" fill="#006"></path><path d="m-7.98 0v2.67l42.57 21.24h5.36v-2.67l-42.58-21.24h-5.36zm37.31 7.97 10.62-5.3v-2.67h-5.36l-14.61 7.29v-7.29h-7.99v7.97h-19.97v7.97h10.62l-10.62 5.3v2.67h5.36l14.61-7.29v7.29h7.99v-7.97h19.97v-7.97z" fill="#fff"></path><path d="m-7.98 9.57v4.78h47.93v-4.78zm21.57 14.43h4.79v-24h-4.79zm-21.57-.09 15.98-7.97h3.57l-15.98 7.98h-3.57zm0-23.92 15.97 7.98h-3.57l-12.4-6.19v-1.78zm28.38 7.97 15.98-7.96h3.57l-15.98 7.97h-3.57zm19.55 15.94-15.98-7.96h3.57l12.4 6.19v1.78z" fill="#c00"></path></svg>		
							<svg v-if="index==4" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false"><path d="m0 0h32v24h-32z" fill="#00247d"></path><path d="m0 0h1.93l15.35 11.1v1.4h-1.93l-15.35-11.1zm13.46 4.17h3.83v4.17h-7.2v4.17h-2.88v-3.81l-5.27 3.81h-1.93v-1.4l3.83-2.77h-3.83v-4.17h7.2v-4.17h2.88v3.81l5.27-3.81h1.93v1.4z" fill="#fff"></path><path d="m0 5v2.5h17.28v-2.5zm7.78-5v12.5h1.73v-12.5zm-7.78 12.5 5.76-4.17h1.29l-5.76 4.17zm0-12.5 5.76 4.17h-1.29l-4.47-3.24zm10.24 4.17 5.76-4.17h1.29l-5.76 4.17zm7.05 8.33-5.76-4.17h1.29l4.47 3.24z" fill="#c00"></path><path d="m14.99 19.63-2.18.19.3 2.17-1.51-1.59-1.51 1.59.3-2.17-2.18-.19 1.88-1.12-1.21-1.83 2.05.78.67-2.09.67 2.09 2.05-.78-1.21 1.83zm9.34 2-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08zm0-14.1-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08zm-5.29 5.73-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08zm9.99-1.41-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08.82-.49zm-1.93 4.16-.52.32.14-.59-.47-.39.61-.05.23-.56.23.56.61.05-.47.39.14.59z" fill="#fff"></path></svg>	
							<svg v-if="index==5" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false" ><path d="m0 0h32v24h-32z" fill="#c00"></path><path d="m8 0h16v24h-16z" fill="#fff"></path><path d="m10.62 12.06-.62.22 2.88 2.58c.22.66-.08.86-.26 1.21l3.13-.41-.08 3.21.65-.02-.14-3.19 3.13.38c-.19-.42-.37-.64-.19-1.31l2.88-2.44-.5-.19c-.41-.32.18-1.56.27-2.34 0 0-1.68.59-1.79.28l-.43-.84-1.53 1.72c-.17.04-.24-.03-.28-.17l.71-3.58-1.12.64c-.09.04-.19.01-.25-.11l-1.08-2.2-1.11 2.29c-.09.08-.17.09-.24.04l-1.07-.61.64 3.56c-.05.14-.17.18-.32.1l-1.45-1.7c-.19.31-.32.82-.57.94-.25.11-1.1-.22-1.67-.34.19.71.8 1.9.42 2.29z" fill="#c00"></path></svg>
							<svg v-if="index==6" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false" ><path fill="#FFF" d="M0 0h32v24H0z"></path><circle fill="#C00" cx="16" cy="12" r="7"></circle></svg>
							<span>{{item.code}} ( {{item.symbol}} )</span>
							<span v-if="item.sure" class="iconfont true">&#xe61e;</span>
						</div>

					</div>
					<!-- <select class="selectCurrey" v-model="currency">
						<option v-for="(item,index) in exchange" :value="item.code">{{item.code}} ( {{item.symbol}} )</option>
					</select>-->
					
					
				</li>
				<!-- <li @click="showContact">Customize Your Trip<em class="hot">HOT</em></li> -->
				<li @click="isShowAnonymityback">My Bookings</li>
				<li @click="show">Log In</li>
				<li @click="goUrlContact" @mouseenter="showContactUs=true" @mouseleave="showContactUs=false">Contact Us</li>
			</ul>
			<ul class="login" v-if="logIn==1">
				<!-- <li @click="showContact">Customize Your Trip<em class="hot">HOT</em></li> -->
				<li class="selectCurrency" @click="showSelectCurreney">
					<label>{{currency}} ( {{symbol}} ) <span class="iconfont">&#xe666;</span> </label>
					<div class="currencyBox" v-if="showCurrency">
						<div class="currencyItem" :class="{color:item.sure}"  v-for="(item,index) in exchange" @click.stop="setCurrency(item,index)">	
										
							<svg v-if="index==1" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false">
								<path d="m0 0h32v24h-32z" fill="#de2910">
								</path>
								<path d="m6 7.5-2.1 1.4.8-2.45-2.1-1.55h2.6l.8-2.5.8 2.5h2.6l-2.1 1.55.8 2.45zm5.79-4.59-.92.19.64-.75-.48-.85.88.37.65-.77-.11 1 .88.37-.94.25-.1.98zm2.86 2.38-.46.82-.15-.98-.96-.2.86-.42-.16-.99.69.74.86-.42-.43.87.68.72zm-.24 3.67-.75.57.26-.95-.79-.57.96-.03.26-.97.33.95.96-.03-.75.62.33.93-.79-.51zm-2.63 2.37-.91.23.61-.77-.51-.83.89.34.62-.79-.07 1 .89.34-.93.28-.06.99z" fill="#ffde00">
								</path>
							</svg>
							<svg v-if="index==0" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false" ><path d="m0 0h32v24h-32z" fill="#fff"></path><path d="m0-.25h32v1.85h-32zm-.09 3.85h32v1.85h-32v-1.85zm.13 3.94h32v1.85h-32v-1.85zm-.03 3.62h32v1.85h-32zm0 3.44h32v1.85h-32zm0 3.9h32v1.85h-32zm0 4h32v1.85h-32z" fill="#de2110"></path><path d="m0 0h18v13h-18z" fill="#0334ab"></path><path d="m1.31.61.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.32h.54zm-13.79 1.29.17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm3.06 0 .17.51h.54l-.44.32.17.51-.44-.32-.44.32.17-.51-.44-.31h.54zm-13.79 1.29.17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51zm3.06 0 .17.51h.54l-.44.31.17.51-.44-.32-.44.32.17-.51-.44-.32h.54l.17-.51z" fill="#fff"></path></svg>			
							<svg v-if="index==2" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false"><path d="m0 0h32v24h-32z" fill="#039"></path><path d="m16 5.56-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm3.56.98-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm2.6 2.59-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm.96 3.55-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-.97 3.57-.77.54.29-.94-.77-.6h.96l.29-.96.3.96h.96l-.77.6.29.94-.77-.54zm-2.59 2.61-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-3.56.93-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-3.56-.95-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-2.6-2.62-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm-.95-3.53-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm.95-3.56-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94zm2.61-2.63-.77.54.29-.94-.77-.6h.96l.29-.96.29.96h.96l-.77.6.29.94z" fill="#fc0"></path></svg>	
							<svg v-if="index==3" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false"><path d="m .02 0h32v24h-32z" fill="#006"></path><path d="m-7.98 0v2.67l42.57 21.24h5.36v-2.67l-42.58-21.24h-5.36zm37.31 7.97 10.62-5.3v-2.67h-5.36l-14.61 7.29v-7.29h-7.99v7.97h-19.97v7.97h10.62l-10.62 5.3v2.67h5.36l14.61-7.29v7.29h7.99v-7.97h19.97v-7.97z" fill="#fff"></path><path d="m-7.98 9.57v4.78h47.93v-4.78zm21.57 14.43h4.79v-24h-4.79zm-21.57-.09 15.98-7.97h3.57l-15.98 7.98h-3.57zm0-23.92 15.97 7.98h-3.57l-12.4-6.19v-1.78zm28.38 7.97 15.98-7.96h3.57l-15.98 7.97h-3.57zm19.55 15.94-15.98-7.96h3.57l12.4 6.19v1.78z" fill="#c00"></path></svg>		
							<svg v-if="index==4" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false"><path d="m0 0h32v24h-32z" fill="#00247d"></path><path d="m0 0h1.93l15.35 11.1v1.4h-1.93l-15.35-11.1zm13.46 4.17h3.83v4.17h-7.2v4.17h-2.88v-3.81l-5.27 3.81h-1.93v-1.4l3.83-2.77h-3.83v-4.17h7.2v-4.17h2.88v3.81l5.27-3.81h1.93v1.4z" fill="#fff"></path><path d="m0 5v2.5h17.28v-2.5zm7.78-5v12.5h1.73v-12.5zm-7.78 12.5 5.76-4.17h1.29l-5.76 4.17zm0-12.5 5.76 4.17h-1.29l-4.47-3.24zm10.24 4.17 5.76-4.17h1.29l-5.76 4.17zm7.05 8.33-5.76-4.17h1.29l4.47 3.24z" fill="#c00"></path><path d="m14.99 19.63-2.18.19.3 2.17-1.51-1.59-1.51 1.59.3-2.17-2.18-.19 1.88-1.12-1.21-1.83 2.05.78.67-2.09.67 2.09 2.05-.78-1.21 1.83zm9.34 2-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08zm0-14.1-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08zm-5.29 5.73-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08zm9.99-1.41-.53-.79.89.34.29-.91.29.91.89-.34-.53.79.82.49-.95.08.13.94-.66-.69-.66.69.13-.94-.95-.08.82-.49zm-1.93 4.16-.52.32.14-.59-.47-.39.61-.05.23-.56.23.56.61.05-.47.39.14.59z" fill="#fff"></path></svg>	
							<svg v-if="index==5" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false" ><path d="m0 0h32v24h-32z" fill="#c00"></path><path d="m8 0h16v24h-16z" fill="#fff"></path><path d="m10.62 12.06-.62.22 2.88 2.58c.22.66-.08.86-.26 1.21l3.13-.41-.08 3.21.65-.02-.14-3.19 3.13.38c-.19-.42-.37-.64-.19-1.31l2.88-2.44-.5-.19c-.41-.32.18-1.56.27-2.34 0 0-1.68.59-1.79.28l-.43-.84-1.53 1.72c-.17.04-.24-.03-.28-.17l.71-3.58-1.12.64c-.09.04-.19.01-.25-.11l-1.08-2.2-1.11 2.29c-.09.08-.17.09-.24.04l-1.07-.61.64 3.56c-.05.14-.17.18-.32.1l-1.45-1.7c-.19.31-.32.82-.57.94-.25.11-1.1-.22-1.67-.34.19.71.8 1.9.42 2.29z" fill="#c00"></path></svg>
							<svg v-if="index==6" viewBox="0 0 32 24" role="presentation" aria-hidden="true" focusable="false" ><path fill="#FFF" d="M0 0h32v24H0z"></path><circle fill="#C00" cx="16" cy="12" r="7"></circle></svg>
							<span>{{item.code}} ( {{item.symbol}} )</span>
							<span v-if="item.sure" class="iconfont true">&#xe61e;</span>
						</div>

					</div>
					<!-- <select class="selectCurrey" v-model="currency">
						<option v-for="(item,index) in exchange" :value="item.code">{{item.code}} ( {{item.symbol}} )</option>
					</select>-->
					
					
				</li>
				<li @click="goBook" style="margin-right: 33px;">My Bookings</li>
				<!--<li @click="goAboutUs" style="margin-right: 40px;">About Us</li>-->
				<li @click="goUrlContact" @mouseenter="showContactUs=true" @mouseleave="showContactUs=false">Contact Us</li>
				<li @click.stop="contshow"><img :src="logimg" /></li>
				<div class="cont" :class="{'isshow':iscontshow}">
					<ol>
						<!--<li><a>Choose a Tour Guide</a></li>
						<li><a>Choose a Activity</a></li>-->
						<li @click.stop="goBook">
							<a>My Bookings</a>
						</li>
						<li @click.stop="goPrefie">
							<a>My Profile</a>
						</li>
						<!--<li><a>Account Settings</a></li>-->
						<li @click.stop="fb_logout">
							<a>Log Out</a>
						</li>
					</ol>
				</div>
			</ul>

		</div>
		<div class="contact_box" v-show="showContactUs"  @mouseenter="showContactUs=true" @mouseleave="showContactUs=false">
			<div class="contact_item clearfix">
				<span class="iconfont font">&#xe67d;</span>
				<div class="contact_cont">
					<h3><b>Phone Numbers</b></h3>
					<h4>Call us to fasten the communication process.</h4>
					<div class="phone">
						<div>
							<i>
								<svg class="iconCountry" aria-hidden="true">
									 <use xlink:href="#icon-china"></use>
								</svg>
							</i>
							<span>(CN) +86 21 8018 2090</span>
						</div>
						<div>
							<i>
								<svg class="iconCountry" aria-hidden="true">
									 <use xlink:href="#icon-usa"></use>
								</svg>
							</i>
							<span>(US) +1 888 930-8849 (Toll Free)</span>
						</div>	
					</div>				
				</div>
			</div>
			<div class="contact_item pad20 clearfix">
				<span class="iconfont font">&#xe67f;</span>
				<div class="contact_cont">
					<h3><b>Email</b></h3>
					<h4>We respond within one hour during opening hours.</h4>
					<p>Service@localpanda.com</p>
				</div>
			</div>
			<div class="contact_item pad20 clearfix">
				<span class="iconfont font">&#xe67e;</span>
				<div class="contact_cont">
					<h3><b>WhatsApp</b></h3>
					<h4>We respond within one hour during opening hours.</h4>
					<p>+86 166 2018 3842</p>
				</div>
			</div>
			<div class="contact_item pad20 clearfix">
				<span class="iconfont font">&#xe66c;</span>
				<div class="contact_cont">
					<h3><b>WeChat</b></h3>
					<h4>Add our public account and communicate with our customer service directly.</h4>
					<div class="QR_code"><img src="https://cloud.localpanda.com/static/icon/LPwechat.jpg" alt=""></div>
				</div>
			</div>
		</div>
		<AlertTitle :alertTitleStatus="alertTitleStatus" v-on:alert-title-call-back="alertTitleCallBack">
			<h3 slot="alertTitleLogin">{{alertTitleLogin}}</h3>
			<p slot="alertTitleMessage">{{alertTitleMessage}}</p>
		</AlertTitle>
		
		<Alert :isShowAlert="isShowAlert" :alertTitle="alertTitle" :alertMessage="alertMessage" v-on:setIsShowAlert="getIsShowAlert"></Alert>
		<Anonymity :AnonymityStatus="AnonymityStatus" v-on:anonymity-back="isAnonymityback"></Anonymity>

		<div class="searchBox" v-if="showBgSearch" @click.stop="showBgSearchFn">
			<div class="close"><i class="iconfont" @click.stop="close">&#xe606;</i></div>
			<div class="contentBox">

				<div class="searchBox_index clearfix">
					<div class="searchInput">
						<input id="searchInput" type="text" @keyup="searchkey" maxlength="60" placeholder="Attraction, Activity, Destination" autocomplete="off" @keyup.enter="seachFn" @focus="input_highlight=true" @blur="input_highlight=false" v-model="search" />
						<span class="input_highlight" :class="{border:input_highlight}">{{search}}</span>
					</div>
					<div class="select_people">
						<select id="select_people_box" v-model="selectPeople" @change="selectPeopleFn">
							<option v-for="(item,index) in selectOptionsFn()" :value="item.value">
								<label>{{item.text}}</label>
							</option>
						</select>
						<i class="iconfont">&#xe60f;</i>
					</div>
					<div class="searchBtn"  @click.stop="seachFn">
						<button>Search</button>
					</div>
				</div>
				<div class="hotRecommend clearfix" v-if="showRecommend">
					<div class="city">
						<h3>Popular Destinations</h3>
						<ul>
							<li v-for="item in options">
								<a target="_blank" @click.stop="gaRecommendation" :href="getUrl(item,'recommend')">{{item}}</a>
							</li>

						</ul>
					</div>
					<div class="theme">
						<h3>Popular Choices</h3>
						<ul>
							<li v-for="item in thems">
								<a target="_blank" @click.stop="gaRecommendation" :href="getUrl(item,'recommend')">{{item}}</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="seachList" v-show="aa">
					<ul>
						<li v-for="item in seachContentList">
							<a target="_blank" :href="getUrl(item.value,'suggest')" @click="gaSuggestion">
								<i class="iconfont" v-if="item.type=='DESTINATION'">&#xe610;</i>
								<i class="iconfont" v-else>&#xe609;</i>
								<span v-html="textHighlight(item.value)"></span>
							</a>
						</li>
					</ul>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { GetQueryString,getParents } from "~/assets/js/plugin/utils"
	if(process.BROWSER_BUILD) {
		require('~/assets/font/iconfont.js')
	}
	import AlertTitle from '~/components/Prompt/AlertTitle'
	import Anonymity from '~/components/Prompt/Anonymity'
	import Alert from '~/components/Prompt/Alert'
	//import Contact from '~/components/Contact/Contact'
	export default {
		props: ["logIn", "isAnonymity", "isIndex","showSeachList",'nowCurrency','selectNumber'],
		name: 'headercommon',
		data() {
			return {
				fbToken: '',
				alertTitleStatus: false, //alert弹框状态
				alertTitleLogin: "", //弹框标题
				alertTitleMessage: "", //弹框内容
				logimg: '',
				iscontshow: true,
				userid: '',
				ContactStatus: false,
				isShowAlert: false,
				alertTitle: '',
				alertMessage: "",
				objectType: 'CONSULTING',
				deviceWidth: null,
				AnonymityStatus: "", //匿名订单
				loadJs: false,
				showContactUs:false,
				//搜索
				search: '',
				//币种
				currency:'USD',
				symbol:'$',
				exchange:'',
				showCurrency:false,
				seachContentList: [],
				showBgSearch: false,
				selectPeople: 0,
				selectOptions: [
					{
						value:0,
						text:'Number of Travelers'
					},
					{
						value: 1,
						text: "1 Person"
					},
					{
						value: 2,
						text: "2 People"
					},
					{
						value: 3,
						text: "3 People"
					},
					{
						value: 4,
						text: "4 People"
					},
					{
						value: 5,
						text: "5 People"
					},
					{
						value: 6,
						text: "6 People"
					},
					{
						value: 7,
						text: "7 People"
					},
					{
						value: 8,
						text: "8 people"
					},
					{
						value:9,
						text:'9 people & more'
					}
				],
				options: ['Shanghai', 'Beijing', "Xi'an", "Guilin", 'Chengdu',"Tibet","Suzhou","Hangzhou"],
				thems: ["Bund", "Watertown", "Great Wall", "Terra-Cotta Warriors", "Forbidden City", "Li River", "Layover Tour", "Day trips", "Local Food", "Dumplings", "Landmarks", "Short Excursions", "Family Friendly","Panda","Everest Base Camp"],
				showRecommend: true,
				input_highlight:false,
				aa:false
			}
		},
		components: {
			AlertTitle,
			Alert,
			//Contact,
			Anonymity

		},
		methods: {
			showBgSearchFn(){
				this.showBgSearch=true
				
			},
			selectPeopleFn(){
				Cookie.set('participants',this.selectPeople,{path:'/','expires':30})
			},
				//点击搜索按钮
			seachFn(){
				this.search=this.search.replace(/^\s+|\s+$/g,'');
				if(this.search){
					this.Ga("search","search")
					this.Ga("search","direct")
					location.href = this.getUrl(this.search,'direct');
					
				}
				
			},
			goUrlContact(){
				location.href="/info/contact-us"
			},
			searchkey(){
				let search= this.search
				let that=this
				search=search.replace(/^\s+|\s+$/g,'');
				if(search){
					that.showRecommend = false
					that.aa=true
					let postData = {
							keyword: search,
							size: 10
						}
						that.axios.post('https://api.localpanda.com/api/search/suggest', JSON.stringify(postData), {
	
							headers: {
								'Content-Type': 'application/json; charset=UTF-8'
							}
	
						}).then(res => {
							that.seachContentList = res.data
						}, res => {})

				}else{
					that.aa=false
					that.showRecommend = true
				}
			},
			getUrl(value,type){
				return '/activity/list/China?keyword=' + value+'&participants='+this.selectPeople+'&type='+type;	
			},
			gaSuggestion(){
				this.Ga('search','suggestion')
				this.Ga('search','search')
			},
			gaRecommendation(){
				this.Ga('search','recommendation')
				this.Ga('search','search')
			},
			//搜索补全高亮
			textHighlight(value) {
				var reg = new RegExp(this.search, 'gi');
				var textReg = value.match(reg);
				if(textReg) {
					textReg = textReg[0];
				}
				return value.replace(reg, "<b style='color:#1bbc9d'>" + textReg + "</b>");
			},
			close(){
				this.showBgSearch = false
			},
			//显示搜索
			showSearch() {
				this.showBgSearch = true
				this.showCurrency=false
				this.iscontshow=true
				this.$emit('closeSearchList',false)
				setTimeout(() => {
					document.getElementById("searchInput").focus();
				}, 200)

				
			},
			showSelectCurreney(){
				//  this.hiddenHead=false
				this.showCurrency = ! this.showCurrency
				if(this.showCurrency){
					this.$emit('closeSearchList',false)
					
				}
			},
			hideBodyScroll(){
				document.body.style.overflowY = 'hidden';
			},
			showBodyScroll(){
				document.body.style.overflowY = 'inherit';
			},
			isShowAnonymityback() {
				this.AnonymityStatus = true
			},

			isAnonymityback(val) {
				this.AnonymityStatus = val

			},
			
			getIsShowAlert(val) {
				this.isShowAlert = val
			},
			showContact() {
				location.href = "/travel/customize/step1"
			},
			contactCallBack(val) {
				this.istrue=val?true:false;
				if(this.istrue == true) {
					this.isShowAlert = true
					this.alertTitle = "Submission completed!"
					this.alertMessage = "Thank you for your feedback.We will get back to you within 1 day."
					this.istrue = false
				} else {
					this.isShowAlert = true
					this.alertMessage = "Failed!"
				}
				this.ContactStatus = false
			},
			contshow() {
				// this.hiddenHead=false
				this.iscontshow = !this.iscontshow
				this.showCurrency=false

			},
			show() {
				this.alertTitleStatus = true
				this.alertTitleLogin = "Log in to Local Panda",
					this.alertTitleMessage = "Log in to add things to your wishlist and access your bookings from any device."
			},
			alertTitleCallBack(val) {
				//回调后关闭弹框
				var that = this;

				that.alertTitleStatus = false;
			},
			getscoll() {
				
			},
			loadScript(url, callback) {
				var that = this
				var script = document.createElement('script');
				var head = document.getElementsByTagName('head')[0];
				var loaded;
				script.src = url;
				if(typeof callback === 'function') {
					script.onload = script.onreadystatechange = function() {
						if(!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
							script.onload = script.onreadystatechange = null;
							loaded = true;
							callback();

						}
					}
				}
				head.appendChild(script);
			},
			fbAsyncInit() {

				let that = this
				FB.init({
					appId: '487179281653793',
					cookie: true,
					xfbml: true,
					version: 'v2.10'
				});

				FB.AppEvents.logPageView();

				// check on loading
				FB.getLoginStatus(function(response) {

					that.ChangeCallback(response);
					if(that.loadJs == true) {
						that.logOut()
					}
				})

			},
			ChangeCallback(response, flag) {
				if(response.status === 'connected') {

				} else if(response.status === 'not_authorized') { //未经授权
					FB.logout(function(response) {})
				} else {
					//console.log('不是登陆到Facebook;不知道是否授权');
				}
				this.loadJs = true
			},
			logOut() {
				let that = this
				window.localStorage.removeItem("logstate")
				window.localStorage.removeItem("fbToken")
				window.localStorage.removeItem("key")
				window.localStorage.removeItem("userid")
				FB.logout(that.reload);

			},
			fb_logout() {
				let that = this
				that.loadScript("//connect.facebook.net/en_US/sdk.js", that.fbAsyncInit)

			},
			goBook() {
				window.location.href = "/user/myBookings?menu=0&flag=1"
			},
			goPrefie() {
				window.location.href = "/user/profile?menu=1&flag=1"
			},
			reload() {

				if(/\/user\//.test(location.pathname)) {
					window.location.href = "/"
				} else {
					location.reload();
				}

			},
			checkSticky() {
				if(window.scrollY > this.scrollTop) {
					this.sticky = true;
				} else {
					this.sticky = false;
				}
			},
			Ga(action,label){
				ga(gaSend, {
					hitType: 'event',
					eventCategory: 'activity_list',
					eventAction: action,
					eventLabel: label,

				});
			},
			selectOptionsFn(){
				let self=this
				if(self.selectNumber){
					
					var participants=self.selectOptions,
					minParticipants=self.selectNumber.minValue,
					maxParticipants=self.selectNumber.maxValue;
					var newParticipants=[];
					for(var i = 1;i<participants.length;i++){
						if(participants[i].value>=minParticipants&&participants[i].value<=maxParticipants){
							newParticipants.push(participants[i])
						}
					}
					
					newParticipants.unshift({
						text:'Number of Travelers',
						value:0
					})
					
					return newParticipants;
				}else{
					return self.selectOptions
				}
			},
			setCurrency(val,index){
				this.currency=val.code
				this.symbol=val.symbol
				this.showCurrency=false
				for(let i = 0;i<this.exchange.length;i++){
					this.exchange[i].sure=0
					this.exchange[index].sure=1
				}
			},
		},
		mounted() {
			
			let that = this
			this.search=this.$route.query.keyword?this.$route.query.keyword:''
			
			
			document.body.addEventListener("click", function(e) {
				if(!getParents(e.target,'selectCurrency') && e.target.className !=='selectCurrencyBtn'){
					that.iscontshow = true,
					that.showBgSearch=false
					that.showCurrency=false
				}
				
			})
			that.logimg = window.localStorage.getItem("key")

			that.fbToken = window.localStorage.getItem("fbToken")
			 window.addEventListener('scroll',function(){
				that.showCurrency=false
			})


			//获取币种列表
			
			window.currencyCallbackHeader = function(data){
				for(let i = 0;i<data.length;i++){
					data[i].sure=0
				}
				
				that.exchange = data;
				that.$emit('getExchange',data)
			}
			
			//读取币种
			var nowCurrency = JSON.parse(Cookie.get('currency'));
			if(nowCurrency){
				this.currency = nowCurrency.code;
				this.symbol=nowCurrency.symbol;
				for(var i =0 ;i<that.exchange.length;i++){
					
					if(this.currency==that.exchange[i].code){
						that.exchange[i].sure=1
					}else{
						that.exchange[i].sure=0
					}
				}
			}
		 	this.selectPeople=JSON.parse(Cookie.get('participants'))?JSON.parse(Cookie.get('participants')):0;

		},
		watch: {
			// hiddenHead(val, oldVal) {
			// 	if(val){
			// 		console.log(val)
			// 		this.iscontshow=true
			// 		this.showCurrency=false
			// 	}
			// },
			showBgSearch(val){
				if(val){
					this.selectPeople=JSON.parse(Cookie.get('participants'))?JSON.parse(Cookie.get('participants')):0;
					this.hideBodyScroll()
					setTimeout(()=>{
						document.querySelector('#select_people_box option').setAttribute('hidden','hidden')
					},200)
					//
				}else{
					this.showBodyScroll()
				}
			},
			nowCurrency:function(val){
				this.currency= val.code;
				this.symbol=val.symbol;
			},

			currency:function(val){
				var thisCurrency = '',
					exchange = this.exchange;
					console.log(exchange)
				for(var i=0;i<exchange.length;i++){
					var thisData = exchange[i];
					if(thisData.code==val){
						thisCurrency = thisData;
					}
				}
				if(thisCurrency){
					Cookie.set('currency',JSON.stringify({
						code: thisCurrency.code,
						symbol: thisCurrency.symbol,
						sure:thisCurrency.sure
					}),{path:'/','expires':30})
					this.$emit('headCurrency',thisCurrency);
				}
				
				
			}
		}

	}
</script>

<style lang="scss" scoped>
.color{
	color: #1bbc9d;
}
	/** contact us **/

	.contact_box{
		position: absolute;
		right: 0;
		top: 60px;
		background: #fff;
		width: 340px;
		z-index: 66666;
		box-shadow: 0px 2px 6px 0px 
		rgba(0, 0, 0, 0.1);
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		padding: 15px 0 20px;
		.contact_item{
			margin:0 16px;
			border-bottom: 1px solid  #ebebeb;
			&:last-child{
				border-bottom: 0!important;
				padding-bottom: 0!important;
			}
			.font{
				float: left;
				font-size: 18px;
				color:#1bbc9d;
			}
			.contact_cont{
				padding-left: 26px;
				h3{
					font-size: 16px;
					//text-align: left!important;
				};
				h4{
					font-size: 14px;
					color:#878e95;
					margin-top:5px;
					width: 90%;
				}
				.phone{
					margin-top: 5px;
					div{
						padding: 10px 0;
						&:first-child{
							border-bottom: 1px solid #ebebeb;	
						}
						
					}
					span{
						display: inline-block;
						margin-left: 8px;
						font-size: 14px;
						font-weight: bold;
					}
				}
				p{
					font-size: 16px;
					font-weight: bold;
					margin-top: 10px;
				}
				.QR_code{
					margin-top: 15px;
					width: 98px;
					height: 98px;
					background: #ccc;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	
	.pad20{
		padding: 10px 0;
	}
	
	.border{
		border-top: 2px solid #1bbc9d!important;
		
	}
	.searchBox {
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 100000;
		width: 100%;
		box-shadow: 0px 20px 50px 0px rgba(0, 0, 0, 0.2);
		.close {
			height: 60px;
			line-height: 60px;
			color: #1bbc9d;
			text-align: right;
			margin-right: 20px;
			i {
				cursor: pointer;
				font-size: 14px;
			}
		}
		.contentBox {
			margin: 0 auto;
			width: 1112px;
			padding-bottom: 76px;
			.hotRecommend {
				transition: all 0.4s ease-out 0s;
				;
				padding: 54px 0 47px 20px;
				border-bottom-left-radius: 6px;
				border-bottom-right-radius: 6px;
				width: calc(100% - 30px);
				background: #fff;
				z-index: 20;
				h3 {
					text-align: left;
					font-size: 16px;
					font-weight: bold;
				}
				.city {
					float: left;
					width: 376px;
					ul {
						li {
							float: left;
							margin-right: 64px;
							margin-top: 28px;
							font-size: 16px;
							a{
								&:hover{
									color:#1bbc9d;
								}	
							}
							
						}
					}
				}
				.theme {
					border-left: 1px solid #ebebeb;
					float: left;
					padding-left: 73px;
					width: 632px;
					ul {
						li {
							float: left;
							margin-right: 64px;
							margin-top: 28px;
							font-size: 16px;
							a{
								&:hover{
									color:#1bbc9d;
								}	
							}
							
						}
					}
				}
			}
			.seachList {
				transition: all 0.4s ease-out 0s;
				;
				padding-top: 54px;
				background: #fff;
				ul {
					li {
						padding-left: 30px;
						text-align: left;
						font-size: 16px;
						height: 48px;
						line-height: 48px;
						span {
							b {
								color: #1bbc9d!important;
							}
						}
						&:hover {
							background: #f5f7f7;
						}
						i {
							font-size: 16px;
							margin-right: 24px;
						}
					}
				}
			}
			.searchBox_index {
				.searchInput {
					width: 752px;
					position: relative;
					float: left;
					input {
						border: none;
						font-size: 26px;
						width: 100%;
						height: 47px;
						border-bottom: 1px solid #dde0e0;
						box-sizing: border-box;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding: 0;
					}
					;
					.input_highlight {
						z-index: 10;
						position: absolute;
						bottom: 0;
						left: 0;
						height: 0;
						font-size: 26px;
						overflow: hidden;
						color: transparent;
						user-select: none;
						max-width: 100%;
						border-top: 1px solid #000a12;
					}
				}
				.select_people {
					display: inline-block;
					position: relative;
					line-height: 46px;
					height: 47px;
					font-size: 16px;
					border-bottom: 1px solid #dde0e0;
					select {
						width: 170px;
						height: 46px;
						border: 0;
						background-color: transparent;
						appearance: none;
					}
					i {
						position: absolute;
						right: 0;
						font-size: 8px;
					}
				}
				.searchBtn {
					float: right;
					button {
						width: 166px;
						height: 47px;
						line-height: 47px;
						background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
						border-radius: 6px;
						font-size: 16px;
						color: #fff;
						font-weight: bold;
					}
				}
			}
		}
	}
	.iconCountry {
       width: 20px; 
       height: 14px;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
	.icon {
		width: 280px;
		height: 34px;
		vertical-align: middle;
		fill: currentColor;
		overflow: hidden;
	}
	
	#header {
		height: 60px;
		background: #fff;
		min-width: 1400px;
		.heder-cont {
			width: 100%;
			min-width: 1170px;
			height: 60px;
			.headleft{
				float: left;
			}
			.log {
				margin-left: 38px;
				width: 280px;
				height: 55px;
				line-height: 60px;
				display: inline-block;
				span {
					font-size: 46px;
					vertical-align: middle;
					color: #221714;
					&:last-child {
						color: #1dd4b0!important;
						margin-left: 4px;
					}
				}
			}
			.search {
				display: inline-block;
				margin-left: 40px;
				position: relative;
				height: 36px;
				line-height: 36px;
				width: 330px;
				border-radius: 6px;
				background-color: #edf0f0;
				i {
					font-size: 16px;
					position: absolute;
					left: 14px;
				}
				span {
					display: inline-block;
					padding-left: 39px;
					color: #878e95;
					font-size: 16px;
				}
				;
			}
			.init {
				
				float: right;
				margin-right: 38px;
				.selectCurrency{
					cursor: pointer;
					position: relative;
					.selectCurrencyBtn{
						display: block;
					}
				}
				.currencyBox{
					position: absolute;
					background: #fff;
					box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.1);
					border-radius: 5px;
					width: 240px;
					right: 2px;
					z-index:999999;
					.currencyItem{
						cursor: pointer;
						margin:0 15px;
						border-bottom: 1px solid #ebebeb;
						&:last-child{
							border:none;
						}
						svg{
							height: 24px; width: 24px; display: inline-block; fill: currentcolor;vertical-align: middle;
						}
						.true{
							color: #1bbc9d;
							font-size: 14px;
							position: absolute;
							right: 15px;
						}
						span{
							display: inline-block;
							margin-left: 15px;
						}
						
					}
				}
				li {
					position: relative;
					float: left;
					font-size: 16px;
					margin-left: 33px;
					line-height: 60px;
					height: 60px;
					.hot {
						padding: 3px 9px;
						background: #e14f3f;
						border-radius: 20px;
						font-size: 12px;
						color: #fff;
						font-weight: bold;
						margin-left: 8px;
					}
					a{
						display: block;
						&:hover{
							color: #00B886;
						}
					}
					&:first-child {
						margin-left: 0;
					}
					&:hover {
						&:not-nth(:first-child){
							cursor: pointer;
							color: #00B886;
							&:after {
								content: "";
								height: 2px;
								width: 100%;
								background-image: linear-gradient(-90deg, #009efd 0%, #1bbc9d 100%);
								display: block;
								position: absolute;
								left: 0;
								bottom: 1px;
							}
						}
					
					}
				}
			}
			.login {
				float: right;
				margin-right: 38px;
				position: relative;
				height: 55px;
				.selectCurrency{
					cursor: pointer;
					position: relative;
				}
				.currencyBox{
					position: absolute;
					background: #fff;
					box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.1);
					border-radius: 5px;
					width: 240px;
					right: 2px;
					z-index:999999;
					.currencyItem{
						cursor: pointer;
						height: 56px;
						line-height: 56px;
						margin:0 15px;
						border-bottom: 1px solid #ebebeb;
						&:last-child{
							border:none;
						}
						svg{
							height: 24px; width: 24px; display: inline-block; fill: currentcolor;vertical-align: middle;
						}
						span{
							display: inline-block;
							margin-left: 15px;
						}
						.true{
							color: #1bbc9d;
							font-size: 14px;
							position: absolute;
							right: 15px;
						}
						
					}
				}
				li {
					.hot {
						padding: 3px 9px;
						background: #e14f3f;
						border-radius: 20px;
						font-size: 12px;
						color: #fff;
						font-weight: bold;
						margin-left: 8px;
					}
					line-height: 55px;
					float: left;
					font-size: 16px;
					cursor: pointer;
					&:nth-child(1) {
						margin-right: 40px;
						// &:hover {
						// 	color: #1bbc9d!important;
						// }
					}
					img {
						border-radius: 50%;
						width: 28px;
						height: 28px;
						margin-left: 40px;
						vertical-align: middle;
					}
				}
			}
			.cont {
				position: absolute;
				right: 0;
				top: 60px;
				z-index: 22222;
				width: 280px;
				box-shadow: 0px 2px 6px 0px rgba(53, 58, 63, 0.1);
				ol {
					padding: 0 30px;
					background: #fff;
					li {
						float: inherit;
						line-height: 50px!important;
						border-bottom: 1px solid #ebebeb;
						font-size: 16px;
						&:first-child {
							margin-right: 0;
						}
						&:last-child {
							border: none;
						}
						a {
							color: #353a3f;
						}
						&:hover {
							a {
								color: #1bbc9d!important;
							}
							border-color: #1bbc9d!important;
						}
					}
				}
			}
		}
		/** phone **/
		.hederCountMob {
			height: 1.333333rem;
			line-height: 1.333333rem;
			text-shadow: 2.5px 2.5px 10px rgba(0, 0, 0, .3);
			color: #fff;
			.logMobel {
				i {
					font-size: 1.066666rem;
				}
			}
			.meau {
				position: absolute;
				right: 0.266666rem;
				top: 0;
				font-size: 0.48rem;
			}
			.meauList {
				width: 4.773333rem;
				background: #fff;
				position: absolute;
				right: 0;
				top: 1.04rem;
				ol {
					padding: 0.453333rem 0;
					li {
						height: 1.146666rem;
						line-height: 1.146666rem;
						color: #353a3f;
						font-size: 0.373333rem;
						padding-left: 0.453333rem;
					}
				}
			}
		}
		.isshow {
			display: none;
		}
	}
</style>