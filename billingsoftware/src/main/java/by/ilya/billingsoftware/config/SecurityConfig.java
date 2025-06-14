package by.ilya.billingsoftware.config;

import by.ilya.billingsoftware.filters.JwtRequestFilter;
import by.ilya.billingsoftware.service.impl.AppUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final AppUserDetailsService appUserDetailsService;
    private final PassEncoder passEncoder;
    private final JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
          httpSecurity
                  .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                  .csrf(AbstractHttpConfigurer::disable)
                  .authorizeHttpRequests(auth -> auth
                          .requestMatchers("/login", "/encode").permitAll()
                          .requestMatchers("/categories", "/items").hasAnyRole("USER", "ADMIN")
                          .requestMatchers("/admin/**").hasRole("ADMIN")
                          .anyRequest().authenticated())
                  .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                  .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
          return httpSecurity.build();
    }

    private UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"));
        config.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "X-Requested-With",
                "Cache-Control"
        ));
        config.setMaxAge(3600L); // 1 час кеша для preflight
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
    @Bean
    public AuthenticationManager authenticationManager(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(appUserDetailsService);
        authenticationProvider.setPasswordEncoder(passEncoder.passwordEncoder());
        return new ProviderManager(authenticationProvider);
    }
}
